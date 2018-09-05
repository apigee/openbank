<?php
/**
 * @file
 * all_component_features.rules_defaults.inc
 */

/**
 * Implements hook_default_rules_configuration().
 */
function all_component_features_default_rules_configuration() {
  $items = array();
  $items['commerce_payment_commerce_worldpay_bg'] = entity_import('rules_config', '{ "commerce_payment_commerce_worldpay_bg" : {
      "LABEL" : "Payment via Worldpay",
      "PLUGIN" : "reaction rule",
      "ACTIVE" : false,
      "OWNER" : "rules",
      "TAGS" : [ "Commerce Payment" ],
      "ON" : { "commerce_payment_methods" : [] },
      "DO" : [ { "commerce_payment_enable_commerce_worldpay_bg" : [] } ]
    }
  }');
  $items['commerce_payment_devconnect_mint_worldpay'] = entity_import('rules_config', '{ "commerce_payment_devconnect_mint_worldpay" : {
      "LABEL" : "Apigee Mint Recurring Payment via Corporate Gateway Worldpay",
      "PLUGIN" : "reaction rule",
      "ACTIVE" : false,
      "OWNER" : "rules",
      "TAGS" : [ "Commerce Payment" ],
      "ON" : { "commerce_payment_methods" : [] },
      "DO" : [ { "commerce_payment_enable_devconnect_mint_worldpay" : [] } ]
    }
  }');
  $items['rules_after_feedback_posted'] = entity_import('rules_config', '{ "rules_after_feedback_posted" : {
      "LABEL" : "After feedback posted",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "REQUIRES" : [ "rules", "feedback" ],
      "ON" : { "feedback_insert" : [] },
      "DO" : [
        { "mail" : {
            "to" : "youremailid@yourcompany.com",
            "subject" : "New Feedback received on path - [feedback:url] ",
            "message" : "New Feedback received on path - [feedback:url] \\r\\n\\r\\nMessage: \\r\\n[feedback:message]\\r\\n\\r\\n\\r\\nView feedback - [site:url]\\/admin\\/reports\\/feedback\\/[feedback:fid]\\r\\n\\r\\nThanks,\\r\\n[site:name] team",
            "from" : "noreplyyouremailid@yourcompany.com",
            "language" : [ "" ]
          }
        }
      ]
    }
  }');
  return $items;
}
