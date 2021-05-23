resource "aws_waf_ipset" "ipset" {
  name = "researchhub_cloudfront_ipset"

  # the list of IPs we want to whitelist = UoA IP ranges only
  ip_set_descriptors {
    type  = "IPV4"
    value = "130.216.0.0/16"	# uoa network ip range
  }

  ip_set_descriptors {
    type  = "IPV4"
    value = "172.24.0.0/18"	# uoa wifi internal ip range
  }

  ip_set_descriptors {
    type  = "IPV4"
    value = "202.36.244.0/24"	#uoa wifi external ip range
  }
  
  ip_set_descriptors {
    type  = "IPV4"
    value = "10.0.0.0/8"	# vpn internal ip range
  }
  
  ip_set_descriptors {
    type  = "IPV4"
    value = "121.99.0.0/16"		# vpn external ip range
  }
}

resource "aws_waf_rule" "wafrule" {
  depends_on  = [aws_waf_ipset.ipset]
  name        = "researchhub_cloudfront_waf_rule"
  metric_name = "researchhubcloudfrontwafrule"

  predicates {
    data_id = aws_waf_ipset.ipset.id
    negated = false
    type    = "IPMatch"
  }
}

resource "aws_waf_web_acl" "waf_acl" {
  depends_on  = [
    aws_waf_ipset.ipset,
    aws_waf_rule.wafrule,
  ]
  name        = "researchhub_cloudfront_waf_acl"
  metric_name = "researchhubcloudfrontwafacl"

  default_action {
    type = "BLOCK"
  }

  rules {
    action {
      type = "ALLOW"
    }
    
    priority = 1
    rule_id  = aws_waf_rule.wafrule.id
    type     = "REGULAR"
  }
}
