function handleActions(event) {
  const $source = $(this);
  const $target = $($(this).data('target'));
  const actions = $(this).data('actions');
  const state = !~~$(this).data('state');

  for (let i = 0; i < actions.length; i++) {
    const entry = actions[i];
    const [action] = Object.keys(entry);

    setTimeout(event.preventDefault(), 500);
    setTimeout(handleAction(state, $source, $target, action, entry[action], event), 500);
    $(this).data('state', state);
  }
}

function handleAction(state, $source, $target, action, val, event) {
  switch (action) {
    case 'navigate': {
      window.scrollTo(0, 0);
      $source.closest('ul').find('li').removeClass('active');
      $source.addClass('active');
      $target.children().addClass('hidden');
      $(val).removeClass('hidden');
      break;
    }

    case 'create': {
      if (state) {
        $(val).appendTo($target);
      } else {
        $target.empty();
      }
      break;
    }

    case 'show': {
      const timeout = val || 0;

      setTimeout(() => {
        if ($target.attr('hidden')) {
          $target.removeAttr('hidden');
        } else {
          $target.attr('hidden', true);
        }
      }, timeout);
      break;
    }

    case 'enable': {
      const timeout = val || 0;

      setTimeout(() => {
        if ($target.attr('disabled')) {
          $target.removeAttr('disabled');
        } else {
          $target.attr('disabled', true);
        }
      }, timeout);
      break;
    }

    case 'resize': {
      const timeout = val || 0;

      setTimeout(() => {
        if ($target.attr('styled')) {
          $target.removeAttr('styled');
          $target.attr('style', '');
          $target.removeClass('btn-large');
        } else {
          $target.attr('styled', true);
          $target.attr('style', 'width: 100%');
          $target.addClass('btn-large');
        }
      }, timeout);
      break;
    }

    case 'set-text': {
      if (state) {
        $target.text(val);
      } else {
        $target.text('');
      }
      break;
    }

    case 'set-value': {
      if (state) {
        $target.val(val);
      } else {
        $target.val('');
      }
      break;
    }

    case 'set-inner-html': {
      if (state) {
        $target.html(val);
      } else {
        $target.html('');
      }
      break;
    }

    case 'add-attr': {
      const attr = val.attr;
      const value = val.value;
      const dest = val.child ? $target.find(`> ${val.child}`) : $target;

      if (dest.attr(attr) !== value) {
        dest.attr(attr, value);
      } else {
        dest.removeAttr(attr);
      }
      break;
    }

    case 'show-alert-prompt': {
      window.alert(val);
      break;
    }

    case 'show-confirm-prompt': {
      const result = window.confirm(val);
      $target.text(result);
      break;
    }

    case 'show-input-prompt': {
      const result = window.prompt(val);
      $target.text(result);
      break;
    }

    case 'key-press': {
      $source.val(event.key);
      $target.text(event.keyCode);
      break;
    }

    case 'key-chord': {
      $target.bind('contentchanged', function() {
        $source.val($target.text());
      });
      if (event.type === 'keydown') {
        const value = $target.text() === '' ? event.key : `${$target.text()}+${event.key}`;
        $target.text(value);
        $target.trigger('contentchanged');
      } else if (event.type === 'keyup') {
        $target.text('');
      }
      break;
    }

    case 'show-cookies': {
      const cookies = JSON.stringify(_get_cookies(), null, 2).trim();
      $target.html(_code_wrap(cookies));
      break;
    }

    case 'show-lstorage': {
      const content = JSON.stringify(window.localStorage, null, 2).trim();
      $target.html(_code_wrap(content));
      break;
    }

    case 'show-sstorage': {
      const content = JSON.stringify(window.sessionStorage, null, 2).trim();
      $target.html(_code_wrap(content));
      break;
    }

    case 'submit': {
      if (state === true) {
        $.ajax({
          url: 'https://reqres.in/api/login',
          type: 'POST',
          data: {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
          },
          success: function(response) {
            const parsed = JSON.stringify(response, null, 2).trim();
            $target.html(_code_wrap(parsed));
          }
        });
      } else {
        $target.text('');
      }

      break;
    }

    default: {
      if (state) {
        $target.prop(action, val === 'true');
      } else {
        $target.prop(action, val === 'false');
      }
      break;
    }
  }
}

function _get_cookies() {
  const pairs = document.cookie.split(';');
  const cookies = {};
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
  }
  return cookies;
}

function _code_wrap(content) {
  return `<pre><code>${content}</code></pre>`;
}

$(() => {
  // materialize init
  M.Collapsible.init($('.collapsible.expandable'), { accordion: false });
  $(document).ready(() => $('select').formSelect());
  $(document).ready(() => $('.materialboxed').materialbox());
  $(document).ready(() => $('.tabs').tabs());

  // app handlers
  function _select_first_tab() {
    const action = 'navigate';
    const state = true;
    const $source = $('#nav-mobile').find('li').first();
    const $target = $('#container');
    const val = '#i-mouse-actions';

    handleAction(state, $source, $target, action, val);
  }

  $(window).on('beforeunload', () => window.scrollTo(0, 0));
  $(window).on('load', _select_first_tab);
  $('[data-actions]').on('click', handleActions).on('keydown', handleActions).on('keyup', handleActions);

  function _change_inner_html_fn(event) {
    const $source = $(this);
    const $target = $($(this).data('target'));
    const state = !~~$(this).data('state');

    event.preventDefault();
    if (state) {
      $target.css('color', '#009688');
      $source.attr('class', $source[0].className + ' disabled');
      $target.html(
        '<p>Change inner html result</p><br /><p class=\'grey-text\'>Double click this element<br />to revert the changes made by #change-inner-html</p>'
      );
    }
  }

  function _change_inner_html_result_fn(event) {
    const $source = $(this);
    const $target = $($(this).data('target'));
    const state = !~~$(this).data('state');

    event.preventDefault();

    if (state) {
      $target.attr('class', $target[0].className.replace('disabled', ''));
      $source.html('');
    }
  }

  function _drag_source_fn(event) {
    window.dragging = {
      pageX0: event.pageX,
      pageY0: event.pageY,
      elem: this,
      offset0: $(this).offset()
    };

    function _detect_drop($el) {
      const $dropZone = $($el.data('dropzone'));
      const $dropZoneText = $($el.data('dropzone-text'));
      const dragOffset = $el.offset();
      const dropOffset = $dropZone.offset();
      const dragTop = dragOffset.top;
      const dragRight = dragOffset.left + $el.outerWidth();
      const dragBottom = dragOffset.top + $el.outerHeight();
      const dragLeft = dragOffset.left;
      const dropTop = dropOffset.top;
      const dropRight = dropOffset.left + $dropZone.outerWidth();
      const dropBottom = dropOffset.top + $dropZone.outerHeight();
      const dropLeft = dropOffset.left;

      if (dragBottom > dropTop && dragTop < dropBottom && dragRight > dropLeft && dragLeft < dropRight) {
        $dropZoneText.text('This is changed by #drag-drop-source');
      } else {
        $dropZoneText.text('This will be changed by #drag-drop-source');
      }
    }

    function _handle_drag(event) {
      const left = window.dragging.offset0.left + (event.pageX - window.dragging.pageX0);
      const top = window.dragging.offset0.top + (event.pageY - window.dragging.pageY0);

      $(window.dragging.elem).offset({
        top: top,
        left: left
      });

      _detect_drop($(window.dragging.elem));
    }

    function _handle_mouse_up(event) {
      $('body').off('mousemove', _handle_drag).off('mouseup', _handle_mouse_up);
    }

    $('body').on('mouseup', _handle_mouse_up).on('mousemove', _handle_drag);
  }

  function _move_to_fn(event) {
    const $target = $($(this).data('target'));
    const x = event.pageX;
    const y = event.pageY;

    $target.text(`X: ${x} | Y: ${y}`);
  }

  function _scroll_to_fn(event) {
    const $source = $('#scroll-to');
    const $target = $('#scroll-to-result');

    function _get_viewport_offset($elem) {
      const $window = $(window);
      const scrollLeft = $window.scrollLeft();
      const scrollTop = $window.scrollTop();
      const offset = $elem.offset();
      const rect1 = {
        x1: scrollLeft,
        y1: scrollTop,
        x2: scrollLeft + $window.width(),
        y2: scrollTop + $window.height()
      };
      const rect2 = {
        x1: offset.left,
        y1: offset.top,
        x2: offset.left + $elem.width(),
        y2: offset.top + $elem.height()
      };
      return {
        left: offset.left - scrollLeft,
        top: offset.top - scrollTop,
        insideViewport: rect1.x1 < rect2.x2 && rect1.x2 > rect2.x1 && rect1.y1 < rect2.y2 && rect1.y2 > rect2.y1
      };
    }

    if ($source.visible(true)) {
      const rect = _get_viewport_offset($target);
      $target.text(`Left: ${Math.round(rect.left * 100) / 100} | Top: ${Math.round(rect.top * 100) / 100}`);
    } else {
      $target.text('');
    }
  }

  $('#change-txt').on('contextmenu', handleActions);
  $('#change-txt').off('click');
  $('#change-val').on('auxclick', handleActions);
  $('#change-val').off('click');
  $('#change-inner-html').off('click');
  $('#change-inner-html-result').off('click');
  $('#change-inner-html').on('dblclick', _change_inner_html_fn);
  $('#change-inner-html-result').on('dblclick', _change_inner_html_result_fn);
  $('#drag-drop-source').on('mousedown', _drag_source_fn);
  $('#move-to').on('mouseenter', _move_to_fn);
  $('#move-to').on('mouseleave', () => $($(this).data('target')).text(''));
  document.addEventListener('scroll', _scroll_to_fn, true);
});
