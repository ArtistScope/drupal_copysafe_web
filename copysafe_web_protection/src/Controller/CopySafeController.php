<?php

namespace Drupal\copysafe_web_protection\Controller;

use Drupal\file\Entity\File;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Form\FormBuilder;
use Symfony\Component\HttpFoundation\Request;

/**
 * CopySafeController class.
 */
class CopySafeController extends ControllerBase {

  /**
   * The form builder.
   *
   * @var \Drupal\Core\Form\FormBuilder
   */
  protected $formBuilder;

  /**
   * The ModalFormExampleController constructor.
   *
   * @param \Drupal\Core\Form\FormBuilder $formBuilder
   *   The form builder.
   */
  public function __construct(FormBuilder $formBuilder) {
    $this->formBuilder = $formBuilder;
  }

  /**
   * {@inheritdoc}
   *
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   *   The Drupal service container.
   *
   * @return static
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('form_builder')
    );
  }

  /**
   * Callback for opening the modal form.
   */
  public function openEmbedOptionsModalForm(Request $request, $fid = NULL) {
    $response = new AjaxResponse();

    $fid = (int) $fid;
    if (is_null($fid) || !is_numeric($fid)) {
      return ['#makup' => ''];
    }

    $file = File::load($fid);

    // Get the modal form using the form builder.
    $modal_form = $this->formBuilder->getForm('Drupal\copysafe_web_protection\Form\CopySafeWebClass', ['fid' => (int) $fid]);

    // Add an AJAX command to open a modal dialog with the form as the content.
    $response->addCommand(new OpenModalDialogCommand($this->t('File embed options for @name', ['@name' => $file->getFilename()]), $modal_form, ['width' => '800']));

    return $response;
  }

}