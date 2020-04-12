import boto3

class CloudFormationManager:
    """ AWS Cloudformation manager """

    def __init__(self, session):
        self.session = session
        self.cloudformation = session.resource('cloudformation')


    def get_resource_id(self, stack_name, logical_id):
        resource = self.cloudformation.StackResource(stack_name, logical_id)
        return resource.physical_resource_id
