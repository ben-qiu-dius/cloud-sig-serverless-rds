#!/user/bin/python

# coding: utf-8
import boto3
import click

session = boto3.Session()
s3 = session.resource('s3')

@click.group()
def cli():
    """Deploy RDS proxy to AWS"""
    pass


@cli.command('list-buckets')
def list_buckets():
    """List all s3 buckets"""
    for bucket in s3.buckets.all():
        print(bucket)


@cli.command('list-bucket-objects')
@click.argument('bucket')
def list_bucket_objects(bucket):
    """List all s3 buckets"""
    for object in s3.Bucket(bucket).objects.all():
        print(object)


if __name__ == '__main__':
    cli()

