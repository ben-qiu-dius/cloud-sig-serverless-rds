#!/user/bin/python

# coding: utf-8
import boto3
import click

from cloudformation import CloudFormationManager
from secrets_manager import SecretsManager

session = None
cloudformation_manager = None
secretsmanager = None

@click.group()
@click.option('--region', default='ap-northeast-1',
              help="Use a given AWS region.")
@click.option('--profile', default=None,
              help="Use a given AWS profile.")
def cli(profile, region):
    """Deploy RDS proxy to AWS"""
    global session, cloudformation_manager, secretsmanager

    session_cfg = {}
    if profile:
        session_cfg['profile_name'] = profile
    if region:
        session_cfg['region_name'] = region
    session = boto3.Session(**session_cfg)
    cloudformation_manager = CloudFormationManager(session)
    secretsmanager = SecretsManager(session)

@cli.command('get-resource-id')
@click.argument('stack_name')
@click.argument('logical_id')
def get_resource_id(stack_name, logical_id):
    """Get the AWS resource physical id """
    print(cloudformation_manager.get_resource_id(stack_name, logical_id))


@cli.command('get-secret-id')
@click.argument('secret_name')
def get_secret_id(secret_name):
    """Get the AWS resource physical id """
    print(secretsmanager.get_secret_id(secret_name))


if __name__ == '__main__':
    cli()

