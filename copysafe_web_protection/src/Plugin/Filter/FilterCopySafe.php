<?php

namespace Drupal\copysafe_web_protection\Plugin\Filter;

use Drupal\Core\StreamWrapper\PublicStream;
use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;

/**
 * Provides a filter to copy safe web protection.
 *
 * The attributes in the annotation show examples of allowing all attributes
 * by only having the attribute name, or allowing a fixed list of values, or
 * allowing a value with a wildcard prefix.
 *
 * @Filter(
 *   id = "copysafeweb_protection",
 *   title = @Translation("Enable CopySafeWeb tag replacement"),
 *   description = @Translation("Enables CopySafeWeb tag replacement."),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_MARKUP_LANGUAGE,
 *   settings = {
 *   },
 *   weight = -10
 * )
 */
class FilterCopySafe extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    \Drupal::logger('copysafe')->info(print_r($text, TRUE));
    if (preg_match_all('/\[copysafe_web_protection[^\]]+\]/i', $text, $matches)) {
      global $base_url;
      $settings = [];

      $web_config = \Drupal::config('copysafe_web_protection.settings');
      foreach ($matches[0] as $matched) {
        $img = [];
        preg_match_all('/(height|width|name|border|border_color|text_color|loading_message|hyperlink|target|keyboard|menus|capture|remote)=([\'|"][^\']*[\'|"])/i', $matched, $img);
        $atts = [];

        for ($i = 0; $i < count($img[1]); $i++) {
          $atts[$img[1][$i]] = $img[2][$i];
        }

        static $embed_id;

        if (!isset($embed_id)) {
          $embed_id = 0;
        }

        $csw_id = "copysafe_web_protection_id" . $embed_id;

        $settings['copysafe_web_protection']['embed_options'][$csw_id]['mode'] = !empty($web_config->get('mode')) ? $web_config->get('mode') : '';
        $settings['copysafe_video_protection']['embed_options'][$csw_id]['artisbrowser_min_version'] = !empty($web_config->get('artisbrowser_min_version')) ? $web_config->get('artisbrowser_min_version') : '27.11';
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['height'] = (isset($atts['height'])) ? str_replace("'", "", $atts['height']) : '';
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['width'] = (isset($atts['width'])) ? str_replace("'", "", $atts['width']) : '';
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['name'] = str_replace("'", "", $atts['name']);
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['border'] = (isset($atts['border'])) ? str_replace("'", "", $atts['border']) : 0;
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['border_color'] = (isset($atts['border_color'])) ? str_replace("'", "", $atts['border_color']) : '#fff';
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['text_color'] = (isset($atts['text_color'])) ? str_replace("'", "", $atts['text_color']) : '#000';
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['loading_message'] = (isset($atts['loading_message'])) ? str_replace("'", "", $atts['loading_message']) : 'loading';
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['hyperlink'] = (isset($atts['hyperlink'])) ? str_replace("'", "", $atts['hyperlink']) : 'copysafe_web_protection';
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['target'] = (isset($atts['target'])) ? str_replace("'", "", $atts['target']) : 'target';

        $settings['copysafe_web_protection']['embed_options'][$csw_id]['keyboard'] = (isset($atts['keyboard'])) ? str_replace("'", "", $atts['keyboard']) : 0;
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['capture'] = (isset($atts['capture'])) ? str_replace("'", "", $atts['capture']) : 0;
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['menus'] = (isset($atts['menus'])) ? str_replace("'", "", $atts['menus']) : 0;
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['remote'] = (isset($atts['remote'])) ? str_replace("'", "", $atts['remote']) : 0;

        $default = [
          'ie'        => 'ie',
          'firefox'   => 'firefox',
          'chrome'    => 'chrome',
          'navigator' => 'navigator',
          'opera'     => 'opera',
          'safari'    => 'safari',
        ];
        $browser = !empty($web_config->get('browser')) ? $web_config->get('browser') : $default;
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['name'] = str_replace("'", "", $atts["name"]);
        $filename = str_replace("'", "", $atts["name"]);

        $folder = !empty($web_config->get('uploadfolder')) ? $web_config->get('uploadfolder') : 'upload_folder/copysafe_web_protection';
        $upload_folder = PublicStream::basePath() . "/" . $folder . "/";

        if (!file_exists($upload_folder . $filename)) {
          return "<div style='padding:5px 10px;background-color:#fffbcc'><strong>File($filename) don't exist</strong></div>";
        }

        $settings['copysafe_web_protection']['embed_options'][$csw_id]['asps'] = "";
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['chrome'] = "";
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['firefox'] = "";
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['navigator'] = "";
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['opera'] = "";
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['safari'] = "";
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['msie'] = "";

        if (isset($browser['asps'])) {
          if ($browser['asps'] === "asps") {
            $settings['copysafe_web_protection']['embed_options'][$csw_id]['asps'] = 1;
          }
        }
        if (isset($browser['chrome'])) {
          if ($browser['chrome'] === "chrome") {
            $settings['copysafe_web_protection']['embed_options'][$csw_id]['chrome'] = 1;
          }
        }
        if (isset($browser['firefox'])) {
          if ($browser['firefox'] === "firefox") {
            $settings['copysafe_web_protection']['embed_options'][$csw_id]['firefox'] = 1;
          }
        }
        if (isset($browser['navigator'])) {
          if ($browser['navigator'] === "navigator") {
            $settings['copysafe_web_protection']['embed_options'][$csw_id]['navigator'] = 1;
          }
        }
        if (isset($browser['opera'])) {
          if ($browser['opera'] === "opera") {
            $settings['copysafe_web_protection']['embed_options'][$csw_id]['opera'] = 1;
          }
        }
        if (isset($browser['safari'])) {
          if ($browser['safari'] === "safari") {
            $settings['copysafe_web_protection']['embed_options'][$csw_id]['safari'] = 1;
          }
        }
        if (isset($browser['ie'])) {
          if ($browser['ie'] === "ie") {
            $settings['copysafe_web_protection']['embed_options'][$csw_id]['msie'] = 1;
          }
        }

        $plugin_url = $base_url . '/' . drupal_get_path('module', 'copysafe_web_protection') . '/';
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['plugin_url'] = $base_url . '/' . drupal_get_path('module', 'copysafe_web_protection') . '/';
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['plugin_path'] = $base_url . '/' . drupal_get_path('module', 'copysafe_web_protection') . '/';
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['upload_path'] = $base_url . '/' . $upload_folder;
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['upload_url'] = $base_url . '/' . $upload_folder;

        static $inc;

        if (!isset($inc)) {
          $inc = 0;
        }
        $outputid = "output" . $inc;
        $settings['copysafe_web_protection']['embed_options'][$csw_id]['outputid'] = (isset($outputid)) ? $outputid : '';

        $output = <<<html
            <div id = $outputid>
            </div>
html;

        $text = $this->strReplaceOnce($matched, $output, $text);
        $embed_id++;
        $inc = $inc + 1;
      }

      $result = new FilterProcessResult($text);
      $result->setAttachments([
        'library'        => [
          'copysafe_web_protection/copysafe_web_protection',
        ],
        'drupalSettings' => $settings,
      ]);

      return $result;
    }

    return new FilterProcessResult($text);
  }

  /**
   * Function() for CopySafe Web String Replacement.
   */
  public function strReplaceOnce($str_pattern, $str_replacement, $string) {

    if (strpos($string, $str_pattern) !== FALSE) {
      return substr_replace($string, $str_replacement, strpos($string, $str_pattern), strlen($str_pattern));
    }

    return $string;
  }

  /**
   * {@inheritdoc}
   */
  public function getHTMLRestrictions() {

  }

  /**
   * {@inheritdoc}
   */
  public function tips($long = FALSE) {
    $output = '<p>' . $this->t('HTML header tags generated by Microsoft Office are stripped') . '</p>';
    return $output;
  }

}
