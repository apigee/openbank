<?php

/**
 * @file
 * The callbacks during Apigee install profile are located in this file.
 */

/**
 * Batch operation callback.
 */

function custom_apigee_batch_smartdocs_create_model($model_machine_name, $model_display_name, $model_description) {
//function custom_apigee_smartdocs_import_model_content($model_machine_name, $model_display_name, $model_description) {


 /* Enable SmartDocs module.*/
  if (!module_exists('smartdocs')) {
    module_enable(array('smartdocs'), TRUE);
  }


  // Create SmartDocs  model.
  $model = new Apigee\SmartDocs\Model(devconnect_default_org_config());
  try {
    $model->load($model_machine_name);
    $update = TRUE;
  }
  catch (Apigee\Exceptions\ResponseException $e) {
    $update = FALSE;
  }

  // If the model loaded, then no reason to modify it, just return.
  if ($update) {
      return;
  }

  $model->setName($model_machine_name);
  $model->setDisplayName($model_display_name);
  $model->setDescription($model_description);
  try {
    $model->save($update);
	
  }
  catch (Apigee\Exceptions\ResponseException $e) {
    $message = $e->getResponse();
    $message_obj = @json_decode($message, TRUE);
    if (is_array($message_obj) && array_key_exists('message', $message_obj)) {
      $err_msg = $message_obj['message'];
    }
    else {
      $err_msg = $e->getMessage();
    }
    $msg_args = array('%model' => $model_display_name, '!error_message' => $err_msg);

    drupal_set_message(t('Error creating %model: !error_message', $msg_args), 'error');
    watchdog('apigee', 'Error creating %model: !error_message', $msg_args, WATCHDOG_ERROR);

  }
  catch (Exception $e) {
    $msg_args = array('%model' => $model_display_name, '!error_message' => $e->getMessage());

    drupal_set_message(t('Error creating %model: !error_message', $msg_args), 'error');
    watchdog('apigee', 'Error creating %model: !error_message', $msg_args, WATCHDOG_ERROR);
  }
}

/**
 * Batch Operation Callback.
 */
function custom_apigee_batch_smartdocs_import_model($model_machine_name, $model_import_file, $document_format, $content_type) {


  // Create SmartDocs  model.
  $model = new Apigee\SmartDocs\Model(devconnect_default_org_config());
  try {
    $model->load($model_machine_name);
  }
  catch (Apigee\Exceptions\ResponseException $e) {
    $message = $e->getResponse();
    $message_obj = @json_decode($message, TRUE);
    if (is_array($message_obj) && array_key_exists('message', $message_obj)) {
      $err_msg = $message_obj['message'];
    }
    else {
      $err_msg = $e->getMessage();
    }
    $msg_args = array('%model' => $model_machine_name, '!error_message' => $err_msg);
    drupal_set_message(t('Error importing %model: !error_message', $msg_args), 'error');
    watchdog('apigee', 'Error importing %model: !error_message', $msg_args, WATCHDOG_ERROR);
  }
  catch (Exception $e) {
    $msg_args = array('%model' => $model_machine_name, '!error_message' => $e->getMessage());
    drupal_set_message(t('Error importing %model: !error_message', $msg_args), 'error');
    watchdog('apigee', 'Error importing %model: !error_message', $msg_args, WATCHDOG_ERROR);
  }
  if ($model->getLatestRevisionNumber() <= 0) {
    try {
      // Import the model using the Swagger file.
      $file_contents = file_get_contents($model_import_file);
      $model->importFile($file_contents, $document_format, $content_type);
      drupal_set_message('Sample model %model imported into SmartDocs.', array('%model' => $model->getDisplayName()), 'status');
    }
    catch (Apigee\Exceptions\ResponseException $e) {
      $message = $e->getResponse();
      $message_obj = @json_decode($message, TRUE);
      if (is_array($message_obj) && array_key_exists('message', $message_obj)) {
        $err_msg = $message_obj['message'];
      }
      else {
        $err_msg = $e->getMessage();
      }
      drupal_set_message(t('Error importing %model: !error_message.', array('%model' => $model_machine_name, '!error_message' => $err_msg)), 'error');
      watchdog('apigee', 'Error importing %model: !error_message.', array('%model' => $model_machine_name, '!error_message' => $err_msg), WATCHDOG_ERROR);
    }
    catch (Exception $e) {
      drupal_set_message(t('Error importing %model: !error_message.', array('%model' => $model_machine_name, '!error_message' => $e->getMessage())), 'error');
      watchdog('apigee', 'Error importing %model: !error_message.', array('%model' => $model_machine_name, '!error_message' => $e->getMessage()), WATCHDOG_ERROR);
    }
  }
}
