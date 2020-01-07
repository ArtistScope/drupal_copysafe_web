<?php

namespace Drupal\copysafe_web_protection\Form;

use Drupal\Component\Render\FormattableMarkup;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Url;
use Drupal\file\Entity\File;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Configure copy safe web configuration for this site.
 *
 * @internal
 */
class CopySafeWebConfig extends ConfigFormBase {

  /**
   * Constructs a CopySafeWebConfig object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The factory for configuration objects.
   */
  public function __construct(ConfigFactoryInterface $config_factory) {
    parent::__construct($config_factory);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'copysafe_web_config';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['copysafe_web_protection.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $settings = $this->config('copysafe_web_protection.settings');

    $upload_directory = !empty($settings->get('uploadfolder')) ? $settings->get('uploadfolder') : 'upload_folder/copysafe_web_protection';
    $upload_location = 'public://' . $upload_directory;

    $form['custom_field_name']['image'] = array(
      '#type' => 'managed_file',
      '#title' => t('File Upload'),
      '#upload_validators' => array(
        'file_validate_extensions' => ['class'],
      ),
      '#upload_location' => $upload_location,
      '#description' => t("Only .class files can be uploaded here."),
    );

    $result = db_query("SELECT * FROM {file_managed}")->fetchAll();

    $header = array();
    $header[] = array('data' => 'File', 'field' => 'filename');
    $header[] = array('data' => 'Size', 'field' => 'filesize');
    $header[] = array('data' => 'Date', 'field' => 'timestamp');
    $header[] = array('data' => 'Delete');
    $header[] = array('data' => 'Insert');

    $data = array();
    foreach ($result as $record) {
      if (strpos($record->uri, $upload_location) !== FALSE) {
        $size = round($record->filesize / 1024, 2) . "KB";
        $date = date('d-m-Y H:i:s', $record->created);
        $delete_url = Url::fromRoute('copysafe_web_protection.copysafe_web_file_delete', ['fid' => $record->fid])->toString();
        $del_link_html = new FormattableMarkup('<a href="@dellinkpath" class="button">@name</a>', ['@dellinkpath' => $delete_url, '@name' => 'Delete']);
        $embed_url = Url::fromRoute('copysafe_web_protection.open_embed_options_form', ['fid' => $record->fid])->toString();
        $embed_link_html = new FormattableMarkup('<a href="@linkpath" class="use-ajax button">@name</a>', ['@linkpath' => $embed_url, '@name' => 'Embed options']);

        $data[$record->fid] = array($record->filename, $size, $date, $del_link_html, $embed_link_html);
      }
    }

    $form['html'] = array(
      '#type' => 'table',
      '#header' => $header,
      '#rows' => $data,
      '#empty' => $this->t('No files available.'),
      '#weight' => 9999,
    );

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();

    $strip_file = File::load($values['image']['0']);
    if ($strip_file->isTemporary()) {
      $strip_file->setPermanent();
      $strip_file->save();
    }

    parent::submitForm($form, $form_state);
  }

}
