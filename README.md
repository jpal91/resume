# Resume

##### My Resume website built with Next.js, AWS, Terraform, and Docker

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Tech](#tech)
  - [What I Learned](#what-i-learned)
    - [The Website](#the-website)
    - [Infrastructure](#infrastructure)
    - [Terraform](#terraform)
 - [Continued Development](#continued-development)
 - [Useful Resources](#useful-resources)
- [Author](#author)

 

## Overview

### The Challenge

The creation of this resume/portfolio site was initially inspired by [The Cloud Resume Challenge](https://cloudresumechallenge.dev), a book by Forrest Brazeal. 

The challenge is meant to start someone with generally little cloud experience on the path to a career in Cloud Development. The task is difficult enough to where you would need to either have at least little background programming/cloud experience, or be willing to work hard to learn quickly.

Although the challenge is just that (challenging), it is also accessible enough for a novice to be able to start from scratch and become experienced with their chosen Cloud Provider relatively quickly. Being a programmer of only a little over a year's experience, but a great interest in the Cloud, I took this as an excellent course of action to develop my career. 

Below are the steps required for the challenge and the status of this project:

- [x] **Get Certified**: Get the AWS Cloud Practioner Certification
- [x] **HTML**: Although the original challenge calls for a static HTML webpage, I decided to go with a more reactive website
- [x] **CSS**: Material UI was used for CSS
- [x] **Static Website**: Again, original challenge called for static, but this site does have the static optimizations of Next.js
- [x] **HTTPS**: SSL must be added to the site
- [x] **DNS**: The site must have a custom domain
- [x] **JavaScript**: The challenge calls for you to use JS to make a visitor counter (which has been done)
- [x] **Database**: Use DynamoDB to store the visitor counter
- [x] **API**: Use API Gateway to create an API for your app to communicate with and get visitor count
- [x] **Python**: Use Python to write a Lambda function to return your visitor counter
- [x] **Tests**: Write tests for your Python code
- [x] **Infrastructure as Code**: The original challenge called for CloudFormation, but gave the option for Terraform as well
- [x] **Source Control**: Both the front and back-ends must have their own repo
- [x] **CI/CD**: Both front and back-end should utilize CI/CD with GitHub Actions to deploy/test
- [ ] **Blog Post**: At the end write a blog post detailing your journey and what you've learned

> **Note**
> The back-end portion of this project can be found in my [back-end repo](https://github.com/jpal91/resume-be)
 

### Screenshot

 

### Links


## My Process

### Tech

- **Website**
  - [Next.js](https://nextjs.org/) - Dynamic/Reactive content of the site
  - [Material UI](https://mui.com/) - CSS
- **Infrastructure - [Amazon Web Services -- AWS](https://aws.com)**
  - Elastic Container Service (ECS) - Compute service used to host/run the Docker container
  - Elastic Load Balancer (ELB) - An application load balancer to evenly spread traffic when there are multiple instances
  - Simple Storage Service (S3) - To serve/hold Terraform State files to maintain universal state
  - Route53 - DNS and domain routing
  - Amazon Certificate Manager (ACM) - Used for SSL certificate
  - CloudWatch - For application logging
- **Other Infrastructure**
  - Terraform - For IaC and used to create/manage/destroy all AWS infrastructure
  - GitHub Actions - CI/CD
  - Docker - Used to build a container with the Next.js app which will serve site on ECS

 

### What I Learned

###### The Website
Although I have completed several React/Next based projects, this one had it's challenges due to the nature of what I was trying to accomplish. This project was very heavy in CSS and required a lot of trial and error to get the site how I wanted it to look.

Animations were one of the bigger struggles with this one. I have used CSS animations in the past, but not to the extent of this project. I wanted to create something that was (hopefully) catchy and pleasing to the eye. This is a resume site, after all, and despite the fact that Web Development isn't my main pursuit, I still wanted it to look reasonably good. 

The main theme ended up being `bash`. I got the idea of doing a terminal style design and just ran with it. To help orchestrate the animations, I utilized Redux and created a template for what information I would pass the `Terminal` component to determine what to do next -

```js
const payload = [
    {
        type: "cmd",
        values: [" echo Hello, my name is $(grep "^J.*n$" names.txt)"],
        stage: 0
    },
				...
    {
        type: 'output',
        values: ["Welcome to my Resume"],
        stage: 1
    },
				...
]
```
I found a third party package to help out with the "Typing" effect, [react-typed](https://github.com/ssbeefeater/react-typed). Unfortunately it looks like the author may not be developing on it anymore, but it was incredibly integral to how I wanted the `Terminal` component to act. 
```js
  <Typed 
    typedRef={(typed) => tRef.current = typed}
    strings={aboutMe}
    typeSpeed={75}
    smartBackspace
    backSpeed={75}
    backDelay={1000}
    loop
  />
```
Finally I found a React wrapper for the JavaScript `Interaction Observer` that helped me both set the `Nav` component to change depending on where the user is on the page as well as start animations as well - [react-interaction-observer](https://github.com/thebuilder/react-intersection-observer)
```js
<InView onChange={(e) => startSeq(e)} triggerOnce={true}>
		{({ ref }) => (...)
</Inview>
```
This is simply wrapped around any child components and the ref is passed down and attached to the component you want to trigger the `Interaction Observer`. You can then just use standard `useState`, `useEffect`, etc. hooks to control state or do things like trigger animations, fade in/out, etc. 

The rest of the site was challenging, but the biggest takeaway out of this particular Next.js project was definitely the CSS/Animations. 
 

###### Infrastructure
Definitely the largest takeaways/learning opportunities came in this section. This was the first time for me doing any kind of major project using AWS services or Terraform, and probably took more time to really figure out than the website. This side of the project could have been easily done in a tenth of the time just by using a fully managed service like `AWS's Elastic Beanstalk`, but that wasn't in the spirit of the challenge.

I decided to go with the `Fargate ECS` service as it's not quite as complex in setup as a base `EC2` instance so it's easier to spin up `ECS tasks` without as much configuration, other than the `Dockerfile`. The Dockerfile ended up being fairly simple, as there really wasn't much that the container needed to do other than install the app/packages, build, and finally `npm run start`:
```dockerfile
FROM node:current-alpine

COPY package.json .
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```
The container is then pushed to `AWS's Elastic Container Registry` and from there, an `ECS` instance will serve the container. 

###### Terraform
I'll most likely save some the the specifics for the coming blog post as a whole article could be written just on this part of the project. However, this project really made me come to love/respect Terraform quite a bit. The power to create/destroy in two commands an infrastructure that would take an hour to set up manually on AWS was a huge gamechanger. Even if it was just for testing certain pieces of infrastructure out, this was the way to go to make sure you always have what you need, and you clean up completely after. 

The only issue is that there can be a large learning curve with all of the different little sub-parts of a specific piece of infrastructure, which is going to be a continual learning process. Something that can be just a couple of clicks on the AWS console ends up being a large page of code because you have to provision everything in such minute detail. 

Case in point, the code just for the `ECS Service` already came off daunting when I first looked at it, but that doesn't include the `ECS Task`, or the `ECS Cluster` (not to mention any of the other security groups, IAMs, etc.) that you have to provision to make this service even work. But then again, if you don't want it anymore, just type `terraform destroy` and it's all gone in less than 60 seconds. Incredibly powerful.
```hcl
resource "aws_ecs_service" "ecs_service" {
  name = "${var.service_name}-service"
  cluster = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.service_task_fargate.arn
  desired_count = 1
  launch_type = "FARGATE"

  network_configuration {
    subnets = [aws_subnet.subnet1.id, aws_subnet.subnet2.id]
    assign_public_ip = true
				security_groups = [aws_security_group.ecs_tasks.id]
  }

 load_balancer {
			target_group_arn = aws_alb_target_group.target_group.arn
			container_name = var.service_name
			container_port = 3000
 }
}
```

## Continued Development
There are many things I would ultimately work on in the future, and certain some areas to clean up. In planning stages are -

- Email Integration - I started on a secondary project related to this one to utilize `AWS SES`, `Lambda`, and `S3` to create a serverless email "server"
- Further improve website UI - I believe that I can expand the functionality of the `Terminal` component to have it be even more realistic. Also, improve some of the UI in the bottom sections which weren't changed too much from my original design
- Improved Infrastructure - Ultimately I want to move over to `EC2` instances as opposed to `Fargate`, especially to take advantage of the Free Tier, this is going to take some reconfiguring of my entire `Terraform` setup which will be tricky


## Useful Resources

- [react-interaction-observer](https://github.com/thebuilder/react-intersection-observer)
- [react-typed](https://github.com/ssbeefeater/react-typed)
- [Terraform AWS Docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)


## Author
-   Website - [JustinTheCloud.dev](https://justinthecloud.dev)
-   Frontend Mentor - [@jpal91](https://www.frontendmentor.io/profile/jpal91)
-   GitHub- [https://github.com/jpal91/](https://github.com/jpal91/)
