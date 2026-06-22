import * as IAM from '@aws-sdk/client-iam';
import * as Organizations from '@aws-sdk/client-organizations';
import { AwsOrganizationReader, SupportLevel } from '~aws-provider/aws-organization-reader';

interface IAwsOrganizationReaderStatics {
    getTagsForAccount(that: AwsOrganizationReader, accountId: string): Promise<Record<string, string>>;
    getIamAliasForAccount(that: AwsOrganizationReader, accountId: string): Promise<string>;
    getIamPasswordPolicyForAccount(that: AwsOrganizationReader, accountId: string): Promise<IAM.PasswordPolicy>;
    getSupportLevelForAccount(that: AwsOrganizationReader, accountId: string): Promise<SupportLevel>;
}

describe('aws organization reader accounts', () => {
    const readerStatics = AwsOrganizationReader as unknown as IAwsOrganizationReaderStatics;
    const rootId = 'r-root';

    beforeEach(() => {
        jest.spyOn(readerStatics, 'getTagsForAccount').mockResolvedValue({});
        jest.spyOn(readerStatics, 'getIamAliasForAccount').mockResolvedValue(undefined);
        jest.spyOn(readerStatics, 'getIamPasswordPolicyForAccount').mockResolvedValue(undefined);
        jest.spyOn(readerStatics, 'getSupportLevelForAccount').mockResolvedValue('basic');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('lists deployable accounts using State before Status', async () => {
        const listAccountsResponse: Organizations.ListAccountsForParentCommandOutput = {
            $metadata: {},
            Accounts: [
                { Id: '111111111111', Name: 'state-active-status-suspended', Email: 'state-active-status-suspended@example.com', State: 'ACTIVE', Status: 'SUSPENDED' },
                { Id: '222222222222', Name: 'state-active', Email: 'state-active@example.com', State: 'ACTIVE' },
                { Id: '333333333333', Name: 'state-closed-status-active', Email: 'state-closed-status-active@example.com', State: 'CLOSED', Status: 'ACTIVE' },
                { Id: '444444444444', Name: 'state-pending-activation', Email: 'state-pending-activation@example.com', State: 'PENDING_ACTIVATION' },
                { Id: '555555555555', Name: 'state-pending-closure', Email: 'state-pending-closure@example.com', State: 'PENDING_CLOSURE' },
                { Id: '666666666666', Name: 'state-suspended', Email: 'state-suspended@example.com', State: 'SUSPENDED' },
                { Id: '777777777777', Name: 'legacy-status-active', Email: 'legacy-status-active@example.com', Status: 'ACTIVE' },
                { Id: '888888888888', Name: 'legacy-status-suspended', Email: 'legacy-status-suspended@example.com', Status: 'SUSPENDED' },
                { Id: '999999999999', Name: 'legacy-no-lifecycle', Email: 'legacy-no-lifecycle@example.com' },
            ],
        };
        const send = jest.fn((command: unknown): Promise<unknown> => {
            if (command instanceof Organizations.ListPoliciesCommand) {
                return Promise.resolve({ $metadata: {}, Policies: [] });
            }
            if (command instanceof Organizations.ListRootsCommand) {
                return Promise.resolve({ $metadata: {}, Roots: [{ Id: rootId, Name: 'Root' }] });
            }
            if (command instanceof Organizations.ListOrganizationalUnitsForParentCommand) {
                return Promise.resolve({ $metadata: {}, OrganizationalUnits: [] });
            }
            if (command instanceof Organizations.ListAccountsForParentCommand) {
                return Promise.resolve(listAccountsResponse);
            }
            return Promise.reject(new Error('unexpected command'));
        });

        const reader = new AwsOrganizationReader({ send } as unknown as Organizations.OrganizationsClient);
        const accounts = await reader.accounts.getValue();

        expect(accounts.map(x => x.Id)).toEqual([
            '111111111111',
            '222222222222',
            '777777777777',
            '999999999999',
        ]);
    });
});
