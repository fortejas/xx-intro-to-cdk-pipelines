import { Stack, StackProps } from "aws-cdk-lib";
import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { MyApplicationStack, MyApplicationStage } from "./my-application-stack";

export class MyApplicationPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        // Need to point to an existing connection.
        const connectionArn = 'arn:aws:codestar-connections:eu-west-1:335688126910:connection/8553f863-0a85-4f5e-bff7-e97de16bd390'

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'MyApplicationPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.connection('fortejas/intro-to-cdk-pipelines', 'main', {
                    connectionArn
                }),
                commands: [
                    `npm ci`,
                    `npm run build`,
                    `npx cdk synth`
                ]
            })
        })

        const myApp = new MyApplicationStage(this, 'Dev', {})

        pipeline.addStage(myApp)

    }
}
