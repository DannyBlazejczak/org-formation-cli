import * as Organizations from '@aws-sdk/client-organizations';
import { AwsOrganizationWriter } from '~aws-provider/aws-organization-writer';
import * as AwsProviderUtil from '~aws-provider/util';
import { TestOrganizations } from '../test-organizations';

describe('aws organization writer close account', () => {
    const accountId = '123456789012';

    beforeEach(() => {
        jest.spyOn(AwsProviderUtil, 'sleep').mockResolvedValue(undefined);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('completes when the account reaches State CLOSED without Status', async () => {
        const { writer, send } = createWriter([{ $metadata: {}, Account: { Id: accountId, State: 'CLOSED' } }]);

        await writer.closeAccount(accountId);

        expect(send.mock.calls.filter(([command]) => command instanceof Organizations.CloseAccountCommand)).toHaveLength(1);
        expect(send.mock.calls.filter(([command]) => command instanceof Organizations.DescribeAccountCommand)).toHaveLength(1);
    });

    test('prefers State over Status while polling account closure', async () => {
        const { writer, send } = createWriter([
            { $metadata: {}, Account: { Id: accountId, State: 'PENDING_CLOSURE', Status: 'SUSPENDED' } },
            { $metadata: {}, Account: { Id: accountId, State: 'CLOSED' } },
        ]);

        await writer.closeAccount(accountId);

        expect(send.mock.calls.filter(([command]) => command instanceof Organizations.DescribeAccountCommand)).toHaveLength(2);
    });

    test('falls back to Status when State is missing', async () => {
        const { writer, send } = createWriter([{ $metadata: {}, Account: { Id: accountId, Status: 'SUSPENDED' } }]);

        await writer.closeAccount(accountId);

        expect(send.mock.calls.filter(([command]) => command instanceof Organizations.DescribeAccountCommand)).toHaveLength(1);
    });

    const createWriter = (describeResponses: Organizations.DescribeAccountCommandOutput[]): { writer: AwsOrganizationWriter; send: jest.Mock<Promise<unknown>, [unknown]> } => {
        const send = jest.fn((command: unknown): Promise<unknown> => {
            if (command instanceof Organizations.CloseAccountCommand) {
                return Promise.resolve({ $metadata: {} });
            }
            if (command instanceof Organizations.DescribeAccountCommand) {
                const response = describeResponses.shift();
                if (response === undefined) {
                    return Promise.reject(new Error('unexpected DescribeAccountCommand'));
                }
                return Promise.resolve(response);
            }
            return Promise.reject(new Error('unexpected command'));
        });

        return {
            writer: new AwsOrganizationWriter({ send } as unknown as Organizations.OrganizationsClient, TestOrganizations.createBasicOrganization()),
            send,
        };
    };
});
