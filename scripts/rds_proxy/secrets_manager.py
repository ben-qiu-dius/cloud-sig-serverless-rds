import boto3

class SecretsManager:
    """ AWS SecretsManager """

    def __init__(self, session):
        self.session = session
        self.client = session.client('secretsmanager')


    def get_secret_id(self, secret_name):
        response = self.client.list_secrets()
        secret_id = None
        for secret in response['SecretList']:
            if (secret['Name'] == secret_name):
                secret_id = secret['ARN']
                break
        return secret_id
