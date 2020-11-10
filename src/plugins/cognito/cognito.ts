import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  ISignUpResult,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import config from '@/config';

export class Cognito {

  public constructor() {
    //  aws init
    AWS.config.region = config.AWS.Region;
  }

  /** UserPoolを作成 */
  private get userPool() {
    return new CognitoUserPool({
      UserPoolId: config.AWS.UserPoolId,
      ClientId: config.AWS.ClientId
    });
  }

  /**
   * サインイン済みのユーザー
   * @returns サインイン済みでなければ`null`を返す
   */
  private get currentUser() {
    return this.userPool.getCurrentUser();
  }

  /**
   * コグニートサインアップ
   * @param username 登録するメールアドレス
   * @param password 紐付けるパスワード
   */
  public signUp(username: string, password: string, { name }: { name: string }): Promise<ISignUpResult|Error> {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: username }),
      new CognitoUserAttribute({ Name: 'name', Value: name })
    ];

    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, attributeList, [], (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  /**
   * コグニート認証
   * @param username 認証するメールアドレス
   * @param confirmationCode 認証コード
   */
  public confirmation(username: string, confirmationCode: string): Promise<unknown> {
    const userData = { Username: username, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  /**
   * コグニートサインイン
   * @param username サインインするメールアドレス
   * @param password 照合するパスワード
   */
  public signIn(username: string, password: string): Promise<CognitoUserSession> {
    const userData = { Username: username, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);

    const authenticationData = { Username: username, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          return resolve(result);
        },
        onFailure: (err) => {
          return reject(err);
        }
      });
    });
  }

  /**
   * サインアウト
   */
  public signOut(): void {
    if (this.currentUser) {
      this.currentUser.signOut();
    }
  }

  /**
   * 認証済みか確認
   */
  public checkAuthenticated(): Promise<CognitoUserSession> {
    return new Promise((resolve, reject) => {
      if (!this.currentUser) {
        return reject(this.currentUser);
      }

      this.currentUser.getSession((err: null|Error, session: CognitoUserSession) => {
        if (err) {
          return reject(err);
        }

        if (!session.isValid()) {
          return reject(session);
        } else {
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.AWS.IdentityPoolId,
            Logins: {
              [`cognito-idp.${config.AWS.Region}.amazonaws.com/${config.AWS.UserPoolId}`]: session.getIdToken().getJwtToken()
            }
          });
          return resolve(session);
        }
      });
    });
  }

  /**
   * 認証済みユーザの情報を取得
   */
  public getAttribute(): Promise<CognitoUserAttribute[]> {
    return new Promise((resolve, reject) => {
      if (!this.currentUser) {
        return reject(this.currentUser);
      }

      this.currentUser.getUserAttributes((err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  /**
   * コードの再送
   */
  public resendCode(): Promise<undefined> {
    return new Promise((resolve, reject) => {
      if (!this.currentUser) {
        return reject(this.currentUser);
      }

      this.currentUser.getAttributeVerificationCode('email', {
        onSuccess: () => {
          console.log('success getAttributeVerificationCode');
          return resolve();
        },
        onFailure: (err) => {
          console.log('failed getAttributeVerificationCode: ' + JSON.stringify(err));
          return reject(err);
        }
      });
    });
  }

  /**
   * Eメールアドレス変更後 emailを有効可する
   * @param confirmationCode 認証コード
   */
  public verifyAttribute(confirmationCode: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.currentUser) {
        return reject(this.currentUser);
      }

      this.currentUser.verifyAttribute('email', confirmationCode, {
        onSuccess: (result) => {
          console.log('email verification success');
          return resolve(result);
        },
        onFailure: (err) => {
          console.log('email verification failed');
          return reject(err);
        }
      });
    });
  }

  /**
   * Eメールアドレスの更新
   * @param email 変更後のメールアドレス
   */
  public updateEmailAddress(email: string): Promise<string> {
    const attributes = {
      email: email,
      name: email
    };
    return new Promise((resolve, reject) => {
      this.updateAttributes(attributes)
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  /**
   * パスワード更新
   * @param oldPassword 古いパスワード
   * @param newPassword 新しいパスワード
   */
  public updatePassword(oldPassword: string, newPassword: string): Promise<'SUCCESS'> {
    return new Promise((resolve, reject) => {
      if (!this.currentUser) {
        return reject(this.currentUser);
      }

      this.currentUser.changePassword(oldPassword, newPassword, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }

  /**
   * パスワード忘れメール送信
   * @param email パスワードを忘れたメールの送信
   */
  public forgetPassword(email: string): Promise<unknown> {
    const userData = { Username: email, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: (result) => {
          console.log('email verification success');
          return resolve(result);
        },
        onFailure: (err) => {
          console.log('email verification failed');
          return reject(err);
        }
      });
    });
  }

  /**
   * パスワードリセット
   * @param username 対象のメールアドレス
   * @param newPassword 新しいパスワード
   * @param code 認証コード
   */
  public resetPassword(username: string, newPassword: string, code: string): Promise<unknown> {
    const userData = { Username: username, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(code, newPassword, {
        onSuccess: () => {
          console.log('password reset success');
          return resolve();
        },
        onFailure: (err) => {
          console.log('password reset failed');
          return reject(err);
        }
      });
    });
  }

  /**
   * プロフィール更新
   * @param attributes 変更する情報
   */
  public updateAttributes(attributes: Record<string, string>): Promise<string> {
    const attributeList = Object.keys(attributes).map(key => (
      new CognitoUserAttribute({ Name: key, Value: attributes[key] })
    ));

    return new Promise((resolve, reject) => {
      if (!this.currentUser) {
        return reject(this.currentUser);
      }

      // update attributes
      this.currentUser.updateAttributes(attributeList, (err, result) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      });
    });
  }
}