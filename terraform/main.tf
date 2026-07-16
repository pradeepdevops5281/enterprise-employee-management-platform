terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.53"
    }
  }

  required_version = ">= 1.5.0"
}

provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "employee_management_server" {
  ami           = "ami-0f918f7e67a3323f0"
  instance_type = "t3.micro"

  tags = {
    Name = "employee-management-server"
  }
}
