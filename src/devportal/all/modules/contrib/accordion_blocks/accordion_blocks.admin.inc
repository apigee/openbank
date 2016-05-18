<?php

/**
 * @file
 * Add, Update and Delete block functions for the accordion blocks module.
 */

/**
 * Menu callback for displaying the list of
 * accordion blocks created.
 */
function accordion_block_list() {
  $result = db_select('accordion_blocks', 'sd')
    ->fields('sd', array('title', 'id'))
    ->orderBy('title', 'ASC')
    ->execute();

  $header = array(
    array('data' => t('Accordion Blocks')),
    array('data' => t('Operations'), 'colspan' => 3),
  );

  $rows = array();
  foreach ($result as $row) {
    $tablerow = array(
      array('data' => $row->title),
      array('data' => l(t('Edit'), 'admin/structure/accordion_block/manage/' . $row->id . '/edit')),
      array('data' => l(t('Delete'), 'admin/structure/accordion_block/manage/' . $row->id . '/delete')),
    );
    $rows[] = $tablerow;
  }
  if (!$rows) {
    $rows[] = array(array('data' => t('No Accordion blocks available.'), 'colspan' => 4));
  }

  $build = array(
    '#theme' => 'table',
    '#header' => $header,
    '#rows' => $rows,
    '#attributes' => array('id' => 'accordion_blocks'),
  );

  return $build;
}

/**
 * Deletion of accordion block.
 */
function accordion_block_delete($form, $form_state, $accordion_block) {
  $form['id'] = array('#type' => 'hidden', '#value' => $accordion_block['id']);
  $form['sd_name'] = array('#type' => 'hidden', '#value' => $accordion_block['title']);

  return confirm_form($form, t('Are you sure you want to delete the accordion block %name?', array('%name' => $accordion_block['title'])), 'admin/structure/accordion_block', '', t('Delete'), t('Cancel'));
}

/**
 * Submit handler for accordion block deletion.
 */
function accordion_block_delete_submit($form, &$form_state) {
  $delta = $form_state['values']['sd_name'] . "_" . $form_state['values']['id'];
  db_delete('accordion_blocks')
    ->condition('id', $form_state['values']['id'])
    ->execute();

  db_delete('block')
    ->condition('module', 'accordion_blocks')
    ->condition('delta', $delta)
    ->execute();

  drupal_set_message(t('The accordion block %name has been removed.', array('%name' => $form_state['values']['sd_name'])));

  cache_clear_all();

  $form_state['redirect'] = 'admin/structure/accordion_block';
}
