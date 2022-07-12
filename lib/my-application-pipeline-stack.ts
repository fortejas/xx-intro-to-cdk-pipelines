import { Stack, StackProps } from "aws-cdk-lib";
import { CodePipeline, CodePipelineSource, ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export class MyApplicationPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        // Need to point to an existing connection.
        const connectionArn = ''

        new CodePipeline(this, 'Pipeline', {
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

    }
}
