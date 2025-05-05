<?php

namespace Drupal\veda_ui\Controller;

use Drupal\Core\Controller\ControllerBase;

class VedaUIController extends ControllerBase {

  public function display() {
    return [
      '#markup' => '<div id="veda-ui-root"></div>',
      '#attached' => [
        'library' => [
          'veda_ui/veda_ui_library',
        ],
        'drupalSettings' => [
          'veda_ui' => \Drupal::config('veda_ui.settings')->get(),
        ],
      ],
    ];
  }

}
