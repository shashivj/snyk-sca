
# About the "Snyk-SCA" action
Amazon CodeCatalyst offers a faster planning, development, and delivery lifecycle where developers can quickly and easily develop applications on AWS. Software security is often set in the context of the code we write and libraries we use. As infrastructure as code (IaC) becomes more prevalent, projects are being driven by more Agile and DevOps software development lifecycles (SDLCs), introducing more software development workflows to software security.

In this Repo, we will develop Snyk Action, to find vulnerabilities in your code, open source dependencies, containers, and IaC. 


# snyk-action - The Snyk action tests the following
* snyk test - tests your source code.
* snyk monitor - creates monitoring report and makes it available in Snyk Projects.

## Basic example
<!--
- Include a real-world example + an introduction explaining the example.    
- The example should show just the action YAML code, but...
- If the action relies on other actions, include the larger workflow YAML.  
- Example content follows. -->

The following example shows how to configure **Snyk-CI-workflow**.

> **Note**:  The example is for illustrative purposes, and will not work without additional configuration.


```
Name: Snyk-CI-workflow
SchemaVersion: 1.0
...
Actions:      
  Snyk:
    Identifier: apo/snyk@v1
    Environment:
      Name: codecatalyst-environment
      Connections:
        - Name: codecatalyst-account-connection
          Role: codecatalyst-role
    Inputs:
      Sources:
        - WorkflowSource
    Configuration:
      SnykAuthToken : 'test' # Find Auth Token from Snyk account
```
---

Configuration properties used in this example are described below.


### Snyk

The friendly name for the **Snyk** action, and is used as a label in logs when the action runs.

Required: Yes

Default: Snyk

---

### Identifier

Identifies the action.

Required: Yes

Default: apo/snyk@v1

---

### Environment.Name

The name of an existing environment that you want to associate with the action.  For information about environments, see [Working with environments](https://docs.aws.amazon.com/codecatalyst/latest/userguide/deploy-environments.html) in the *Amazon CodeCatalyst User Guide*.

Required: No

Default: none

---

### Environment.Connections.Name

The name of the account connection. For information about account connections, see [Adding an AWS account to a space](https://docs.aws.amazon.com/codecatalyst/latest/userguide/ipa-connect-account-create.html) in the *Amazon CodeCatalyst User Guide*.

Required: Yes

Default: none

---

### Environment.Connections.Role

The name of the IAM role that the **Snyk** action uses to access AWS resources. Make sure that the role includes:


The following permissions policy:

> **Warning**: Limit the permissions to the minimum required for the action to run successfully. Using a role with broader permissions might pose a security risk.

> **Note**:  The example is for illustrative purposes, and will not work without additional configuration.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "cloudformation:DescribeStackEvents",
                "cloudformation:DescribeChangeSet",
                "cloudformation:DescribeStacks",
                "cloudformation:ListStackResources"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::aws-account:role/cdk-*"
        }
    ]
}
```
The following custom trust policy:
```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "",
                "Effect": "Allow",
                "Principal": {
                    "Service":  [
                       "codecatalyst-runner.amazonaws.com",
                       "codecatalyst.amazonaws.com"
                     ]
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }
```
Make sure that this role is added to your account connection.

For more information on creating IAM roles, see [Creating a role using a custom trust policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-custom.html) in the *AWS Identity and Access Management User Guide*.

---

### Inputs.Sources


If the action needs access to files stored in a source repository, specify the label of that source repository. Currently, the only supported label is `WorkflowSource`.

Required: Yes, if the action needs access to files stored in a source repository.

Default: WorkFlowSource

---

### Configuration.WhoToGreet

Name of the person, who we are greeting here.

Required: Yes

Default: none

---

### Configuration.HowToGreet

How to greet the person.

Required: No

Default: "Hello there,"

---

## How the "Snyk" action works
<!-- An optional section where you can describe behind-the-scenes processing, or extra details. 
Example content follows. -->

The **Snyk** action works as follows:

- At runtime, the action logs a greeting line composed of a configured name and message.

## Troubleshooting
<!-- An optional section where you can provide a link to troubleshooting information. 
Example content follows. -->
For troubleshooting information, see [Troubleshooting problems with workflows](https://docs.aws.amazon.com/codecatalyst/latest/userguide/troubleshooting-workflows.html) in the *Amazon CodeCatalyst User Guide*.

## Additional resources
<!-- Add links to other places in your docs, as required. -->

- [Snyk definition reference](https://www.mycompany.com/docs/ACTIONNAME-action-yaml) - Describes all **Snyk** action properties in detail.
- [Workflow definition reference](https://www.mycompany.com/docs/ACTIONNAME-workflow-yaml) - Describes all available workflow definition file properties in detail.
- [Tutorial](https://www.mycompany.com/docs/ACTIONNAME-action-tut) - Step-by-step instructions on getting the **Snyk** action running in an example scenario.
- [Provide feedback](www.mycompany.com/feedback) - Submit a ticket against this action.

