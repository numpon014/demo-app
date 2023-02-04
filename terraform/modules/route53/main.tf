resource "aws_route53_record" "cname_route53_record" {
  zone_id = var.zone_id
  name    = var.record_name
  type    = "CNAME"
  ttl     = "60"

  records = var.records
}
