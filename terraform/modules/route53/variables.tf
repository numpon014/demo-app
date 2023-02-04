variable "zone_id" {
  type        = string
  description = "The ID of the hosted zone to contain this record"
}

variable "record_name" {
  type        = string
  description = "The name of the record"
}

variable "records" {
  type        = list(string)
  description = "A string list of records"
}
