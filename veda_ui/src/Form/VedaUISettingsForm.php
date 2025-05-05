<?php

namespace Drupal\veda_ui\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class VedaUISettingsForm extends ConfigFormBase {

  protected function getEditableConfigNames() {
    return ['veda_ui.settings'];
  }

  public function getFormId() {
    return 'veda_ui_settings_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('veda_ui.settings');

    $form['mapbox_token'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Mapbox Token'),
      '#default_value' => $config->get('mapbox_token'),
      '#required' => TRUE,
    ];

    $form['api_stac_endpoint'] = [
      '#type' => 'textfield',
      '#title' => $this->t('API STAC Endpoint'),
      '#default_value' => $config->get('api_stac_endpoint'),
      '#required' => TRUE,
    ];

    $form['api_raster_endpoint'] = [
      '#type' => 'textfield',
      '#title' => $this->t('API Raster Endpoint'),
      '#default_value' => $config->get('api_raster_endpoint'),
      '#required' => TRUE,
    ];

    return parent::buildForm($form, $form_state);
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config('veda_ui.settings')
      ->set('mapbox_token', $form_state->getValue('mapbox_token'))
      ->set('api_stac_endpoint', $form_state->getValue('api_stac_endpoint'))
      ->set('api_raster_endpoint', $form_state->getValue('api_raster_endpoint'))
      ->save();

    parent::submitForm($form, $form_state);
  }

}
