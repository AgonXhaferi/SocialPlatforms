import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';
import EmailPassword from 'supertokens-node/recipe/emailpassword';

import {
  AuthModuleConfig,
  ConfigInjectionToken,
} from '@modules/auth/supertoken-config.interface';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '@modules/user/application/commands/create-user/create-user.command';
import { AggregateID } from '@libs/ddd';
import { Result } from 'oxide.ts';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    private readonly commandBus: CommandBus,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Session.init(),
        EmailPassword.init({
          signUpFeature: {
            formFields: [
              {
                id: 'email',
              },
              {
                id: 'country',
              },
              {
                id: 'name',
              },
              {
                id: 'lastName',
              },
              {
                id: 'postalCode',
              },
              {
                id: 'street',
              },
              {
                id: 'userName',
              },
              {
                id: 'age',
              },
              {
                id: 'culture',
              },
            ],
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signUpPOST: async function (input) {
                  const response =
                    await originalImplementation.signUpPOST(input);

                  if (response.status === 'OK') {
                    const formFields = input.formFields;
                    const { id, emails } = response.user;

                    const country = formFields.find(
                      (formField) => formField.id === 'country',
                    ).value;
                    const postalCode = formFields.find(
                      (formField) => formField.id === 'postalCode',
                    ).value;
                    const street = formFields.find(
                      (formField) => formField.id === 'street',
                    ).value;
                    const name = formFields.find(
                      (formField) => formField.id === 'name',
                    ).value;
                    const lastName = formFields.find(
                      (formField) => formField.id === 'lastName',
                    ).value;
                    const userName = formFields.find(
                      (formField) => formField.id === 'userName',
                    ).value;
                    const age = +formFields.find(
                      (formField) => formField.id === 'age',
                    ).value;
                    const culture = formFields.find(
                      (formField) => formField.id === 'culture',
                    ).value;

                    const primaryEmail = emails[0];

                    const command = new CreateUserCommand({
                      culture,
                      country,
                      street,
                      postalCode,
                      email: primaryEmail,
                      id,
                      age,
                      lastName,
                      userName,
                      name,
                    });

                    const result: Result<AggregateID, Error> =
                      await commandBus.execute(new CreateUserCommand(command));

                    if (result.isErr()) {
                      console.error(
                        `Error occurred while registering user through SuperTokens`,
                      );
                      console.error(result.unwrapUnchecked());
                    }
                  }

                  return response;
                },
              };
            },
          },
        }),
        Dashboard.init(),
      ],
    });
  }
}
