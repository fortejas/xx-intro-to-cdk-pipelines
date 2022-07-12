import { Stack, StackProps } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Cluster, ContainerImage } from "aws-cdk-lib/aws-ecs";
import { ApplicationLoadBalancedFargateService } from "aws-cdk-lib/aws-ecs-patterns";
import { Construct } from "constructs";

export class MyApplicationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    // Define the VPC where my application will live.
    const vpc = new Vpc(this, 'Vpc', { maxAzs: 2, natGateways: 1})

    // Define the ECS cluster where we can place services.
    const cluster = new Cluster(this, 'Cluster', { vpc })

    // Define our service as an ALB infront of a Fargate service.
    const app = new ApplicationLoadBalancedFargateService(this, 'Service', {
      cluster,
      taskImageOptions: { image: ContainerImage.fromRegistry('amazon/amazon-ecs-sample') },
      desiredCount: 1,
      publicLoadBalancer: true
    })

  }
}
