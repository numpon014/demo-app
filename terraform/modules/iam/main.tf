data "aws_iam_user" "user" {
  user_name = var.github_iam_user
}

resource "aws_iam_policy" "ci_policy" {
  name        = "github-ci-policy"
  path        = "/"
  description = "Github CI policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:PutObject",
          "s3:PutObjectAcl"
        ],
        Effect = "Allow",
        Resource = [
          "${var.s3_bucket_arn}/*"
        ]
      },
      {
        Action = [
          "s3:ListBucket"
        ],
        Effect = "Allow",
        Resource = [
          var.s3_bucket_arn
        ]
      },
      {
        "Effect": "Allow",
        "Action": [
          "cloudfront:CreateInvalidation"
        ],
        "Resource": var.distribution_arn
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "gitlab_ci_attachment" {
  name       = "github-ci-attachment"
  users      = [data.aws_iam_user.user.user_name]
  policy_arn = aws_iam_policy.ci_policy.arn
}
