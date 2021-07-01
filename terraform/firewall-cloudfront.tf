resource "aws_waf_ipset" "ipset" {
  count = var.create_firewall ? 1 : 0

  name = "researchhub_cloudfront_ipset_${var.lifecycle_state}"

  # the list of IPs we want to whitelist = UoA IP ranges only
  ## https://wiki.auckland.ac.nz/pages/viewpage.action?pageId=143067942
  ip_set_descriptors {
    type  = "IPV4"
    value = "130.216.0.0/16"	# uoa network ip range
  }

  ip_set_descriptors {
    type  = "IPV4"
    value = "172.16.0.0/12"	# uoa wifi internal ip range
  }

  ip_set_descriptors {
    type  = "IPV4"
    value = "202.36.244.0/24"	#uoa wifi external ip range
  }
  
  ip_set_descriptors {
    type  = "IPV4"
    value = "10.0.0.0/8"	# uoa wifi ip range
  }
  
  ip_set_descriptors {
    type  = "IPV4"
    value = "192.168.0.0/16"		# uoa wifi ip range
  }

  ip_set_descriptors {
    type  = "IPV4"
    value = "10.110.0.0/24"	# vpn internal range
  }
}

resource "aws_waf_rule" "wafrule" {
  count = var.create_firewall ? 1 : 0

  depends_on  = [aws_waf_ipset.ipset[0]]
  name        = "researchhub_cloudfront_waf_rule_${var.lifecycle_state}"
  metric_name = "researchhubcloudfrontwafrule${var.lifecycle_state}"

  predicates {
    data_id = aws_waf_ipset.ipset[0].id
    negated = false
    type    = "IPMatch"
  }
}

resource "aws_waf_web_acl" "waf_acl" {
  count = var.create_firewall ? 1 : 0

  depends_on  = [
    aws_waf_ipset.ipset[0],
    aws_waf_rule.wafrule[0],
  ]
  name        = "researchhub_cloudfront_waf_acl_${var.lifecycle_state}"
  metric_name = "researchhubcloudfrontwafacl${var.lifecycle_state}"

  default_action {
    type = "BLOCK"
  }

  rules {
    action {
      type = "ALLOW"
    }
    
    priority = 1
    rule_id  = aws_waf_rule.wafrule[0].id
    type     = "REGULAR"
  }
}
