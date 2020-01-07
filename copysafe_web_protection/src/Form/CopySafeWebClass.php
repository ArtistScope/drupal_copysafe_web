<?php

namespace Drupal\copysafe_web_protection\Form;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\file\Entity\File;

/**
 * Configure copy safe web class configuration for this site.
 *
 * @internal
 */
class CopySafeWebClass extends FormBase {

  /**
   * ID of the file to generate copy safe script.
   *
   * @var int
   */
  protected $fid;

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'copysafe_web_class';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['copysafe_web_protection.class_settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $fid = NULL) {
    $settings = $this->config('copysafe_web_protection.class_settings');

    $form['#prefix'] = '<div id="copysafe-class-config">';
    $form['#suffix'] = '</div>';

    if (empty($fid) || !is_numeric($fid['fid'])) {
      return RedirectResponse::create('/admin/config/copysafe/copysafe_web_protection', RedirectResponse::HTTP_MOVED_PERMANENTLY);
    }

    $file = File::load($fid['fid']);

    if (empty($file)) {
      return RedirectResponse::create('/admin/config/copysafe/copysafe_web_protection', RedirectResponse::HTTP_MOVED_PERMANENTLY);
    }

    $form['filename'] = array(
      '#type' => 'textfield',
      '#default_value' => $file->getFilename(),
      '#title' => t('File Name'),
      '#disabled' => TRUE,
    );

    $form['width'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('width')) ? $settings->get('width') : '',
      '#title' => t('Width'),
      '#size' => 20,
      '#field_suffix' => t('(in pixels - leave blank to use filename settings)'),
    );

    $form['height'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('height')) ? $settings->get('height') : '',
      '#title' => t('Height'),
      '#size' => 20,
      '#field_suffix' => t('(in pixels)'),
    );

    $form['bordersize'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('bordersize')) ? $settings->get('bordersize') : '0',
      '#title' => t('Border size'),
      '#size' => 20,
      '#field_suffix' => t('(in pixels)'),
    );

    $form['bordercolor'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('bordercolor')) ? $settings->get('bordercolor') : 'FFFFFF',
      '#title' => t('Border color'),
      '#size' => 20,
      '#field_suffix' => t('(without the #)'),
    );

    $form['textcolor'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('textcolor')) ? $settings->get('textcolor') : 'CCCCCC',
      '#title' => t('Text color'),
      '#size' => 20,
      '#field_suffix' => t('(without the #)'),
    );

    $form['prevent'] = array(
      '#type' => 'checkboxes',
      '#default_value' => !empty($settings->get('prevent')) ? $settings->get('prevent') : array(),
      '#title' => t('Prevent'),
      '#options' => array(
        'capture' => t('Prevent Capture'),
        'keyboard' => t('Prevent Keyboard'),
        'menus' => t('Prevent Menus'),
        'remote' => t('Prevent Remote'),
      ),
    );

    $form['loading'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('loading')) ? $settings->get('loading') : 'loading',
      '#title' => t('Loading message'),
    );

    $form['hyperlink'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('hyperlink')) ? $settings->get('hyperlink') : '/next.php',
      '#title' => t('Hyperlink'),
    );

    $form['target'] = array(
      '#type' => 'textfield',
      '#default_value' => !empty($settings->get('target')) ? $settings->get('target') : '_self',
      '#title' => t('Target frame'),
    );

    $form['actions'] = array('#type' => 'actions');

    $form['actions']['insertcode'] = [
      '#type' => 'submit',
      '#value' => $this->t('Generate CopySafe Script'),
      '#attributes' => [
        'class' => [
          'use-ajax',
          'edit-insertcode'
        ],
      ],
      '#ajax' => [
        'callback' => [$this, 'submitClassFormAjax'],
        'event' => 'click',
      ],
    ];

    $form['#attached']['library'][] = 'core/drupal.dialog.ajax';

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {}

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = \Drupal::service('config.factory')->getEditable('copysafe_web_protection.class_settings');

    $config->set('filename', $form_state->getValue('filename'))
      ->set('width', $form_state->getValue('width'))
      ->set('height', $form_state->getValue('height'))
      ->set('bordersize', $form_state->getValue('bordersize'))
      ->set('bordercolor', $form_state->getValue('bordercolor'))
      ->set('textcolor', $form_state->getValue('textcolor'))
      ->set('prevent', $form_state->getValue('prevent'))
      ->set('loading', $form_state->getValue('loading'))
      ->set('hyperlink', $form_state->getValue('hyperlink'))
      ->set('target', $form_state->getValue('target'))
      ->save();
  }

  /**
   * AJAX callback handler that displays any errors or a success message.
   */
  public function submitClassFormAjax(array $form, FormStateInterface $form_state) {
    $response = new AjaxResponse();

    // If there are any form errors, re-display the form.
    if ($form_state->hasAnyErrors()) {
      $response->addCommand(new ReplaceCommand('#copysafe-class-config', $form));
    }
    else {
      $values = $form_state->getValues();

      $data = array(
        "name='" . $values['filename'] . "'",
        "width='" . $values['width'] . "'",
        "height='" . $values['height'] . "'",
        "border='" . $values['bordersize'] . "'",
        "border_color='" . $values['bordercolor'] . "'",
        $values['prevent']['capture'] !== 0 ? "capture='1'" : "capture='0'",
        $values['prevent']['keyboard'] !== 0 ? "keyboard='1'" : "keyboard='0'",
        $values['prevent']['menus'] !== 0 ? "menus='1'" : "menus='0'",
        $values['prevent']['remote'] !== 0 ? "remote='1'" : "remote='0'",
        "textcolor='" . $values['textcolor'] . "'",
        "loading_message='" . $values['loading'] . "'",
        "hyperlink='" . $values['hyperlink'] . "'",
        "target='" . $values['target'] . "'",
      );

      $copysafe_script = '<div id="copysafe-script-wrap">[copysafe_web_protection ' . implode($data, ' ') . ' ]</div>
      <br />';

      $response->addCommand(new OpenModalDialogCommand("CopySafe Script for " . $values['filename'], $copysafe_script, ['width' => 800]));
    }

    return $response;
  }

}
