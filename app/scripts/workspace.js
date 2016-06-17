'use strict';

$(function()
{
  var docID = window.location.hash;
  var docsURL = 'https://docs.google.com/document/d/';
  var sheetsURL = 'https://sheets.google.com/spreadsheets/d/';
  var slidesURL = 'https://slides.google.com/presentation/d/';

  // Set iframe up
  // $('#panel1').attr('src', 'https://docs.google.com/document/d/1gpqk6rDFeCxHC1J9ZbVDx2locQSe3UwSsAXePIOGWJM/edit?pli=1&auth=ZQNxWGqGwXXlVVvqNV6p0qsIIWDI8mBCZmfnPyEkjycnhGgPXNWlD9B0X4D5gSSfAD8TVA.');
  // $('#panel2').attr('src', 'https://docs.google.com/spreadsheets/d/123132iU1J7BaVX9WPe7ZO0KUg4ySnzjazGRtJM9cuCg/edit#gid=606990955');

  // Generates unique ID
  function uniqueID() {
    return Math.round(new Date().getTime() * (Math.random() * 100));
  }

  function loadPanel(url)
  {
    console.log('loadPanel:', url);

    // Shrink dropbox
    var $dropbox = $('.placeholder');
    if ($dropbox.hasClass('empty')) {
      $dropbox.removeClass('empty');
    }

    // Create panel
    $(document.createElement('div'))
      .addClass('container')
      .append($(document.createElement('iframe'))
        .addClass('panel')
        .attr('src', url)
        .attr('id', uniqueID())
        .on('load', saveWorkspace)
      )
      .appendTo('.content');

    // Recalculate layout
    var $panels = $('.container');
    var numPanels = $panels.length;
    switch (numPanels) {
      case 1:
        $panels.css({
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        });
        break;

      case 2:
        $panels.each(function(i, el) {
          $(this).animate({
            width: '50%',
            height: '100%',
            top: 0,
            left: (i * 50) + '%',
          });
        });
        break;

      case 3:
        $panels.each(function(i, el) {
          switch (i) {
            case 0:
              $(this).animate({
                width: '50%',
                height: '100%',
                top: 0,
                left: 0,
              });
              break;
            case 1:
              $(this).animate({
                width: '50%',
                height: '50%',
                top: 0,
                left: '50%',
              });
              break;
            case 2:
              $(this).animate({
                width: '50%',
                height: '50%',
                top: '50%',
                left: '50%',
              });
              break;
          }
        });
        break;

      case 4:
        $panels.each(function(i, el) {
          switch (i) {
            case 0:
              $(this).animate({
                width: '50%',
                height: '50%',
                top: 0,
                left: 0,
              });
              break;
            case 1:
              $(this).animate({
                width: '50%',
                height: '50%',
                top: 0,
                left: '50%',
              });
              break;
            case 2:
              $(this).animate({
                width: '50%',
                height: '50%',
                top: '50%',
                left: '50%',
              });
              break;
            case 3:
              $(this).animate({
                width: '50%',
                height: '50%',
                top: '50%',
                left: 0,
              });
              break;
          }
        });
        break;
    }



    // Allow dragging and moving around of containers
    // $( '#draggable5' ).draggable({ grid: [ 80, 80 ] });

    // Set container resizable
    // $('.container').resizable({
    //   helper: 'ui-resizable-helper',
    //   grid: 50,
    //   start: function(event, ui) {
    //     $('iframe').css('pointer-events','none');
    //   },
    //   stop: function(event, ui) {
    //     $('iframe').css('pointer-events','auto');
    //   }
    // });
  }

  // save on exit
  // window.onbeforeunload = function() {
    // saveWorkspace();
  // };

  // Hide footer
  function hideFooter() {
    $('.footer').addClass('hide');
  }

  // Save workspaces
  function saveWorkspace() {
    var data = JSON.parse( localStorage.getItem( 'data' ) )
    if (!data) {
      data = {};
    }
    var urls = [];
    $('.panel').each(function (index, el) {
      console.log(el);
      urls.push({
        // title: $(el).contentDocument.title,
        url: $(el).attr('src'),
      });
    });
    console.log('save workspace:', urls);
    if (urls.length) {
      data[uniqueID()] = urls;
      localStorage.setItem( 'data', JSON.stringify(data) );
    }
  };

  var isAdvancedUpload = function() {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
  }();

  if (isAdvancedUpload)
  {
    var $dropbox = $('.dropbox'), $placeholder = $('.placeholder');
    $dropbox.addClass('has-advanced-upload');

    // Add event listener for dragging
    $dropbox.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
      switch (e.originalEvent.type) {
        case 'drop':
          var data = e.originalEvent.dataTransfer;
          var url = data.getData('text');
          hideFooter();
          loadPanel(url);
          e.preventDefault();
          break;

        case 'dragleave':
          e.stopPropagation();
          break;
      }
    })
    .on('dragover dragenter', function() {
      $dropbox.addClass('is-dragover');
      $placeholder.addClass('is-dragover');
    })
    .on('dragleave dragend drop', function(e) {
      $dropbox.removeClass('is-dragover');
      $placeholder.removeClass('is-dragover');
    });
  }

  // Load pre-existing workspaces
  var data = JSON.parse( localStorage.getItem( 'data' ) );
  if (data) {
    var keys = Object.keys(data);
    $.each(keys, function(index, key) {
      var workspace = data[key];
      var list = $(document.createElement('ol'));
      $.each(workspace, function(index, item) {
        list.append($(document.createElement('li'))
          .append($(document.createElement('a'))
            .attr('href', item.url)
            .text(item.url.substr(0, item.url.indexOf('/', 9)))
          )
        );
      });
      $(document.createElement('div'))
        .addClass('workspace')
        .attr('id', key)
        .append(list)
        .append($(document.createElement('button'))
          .text('X')
          .click(function(e) {
            $(this).parents('.workspace').slideDown(300, function() {
              var id =$(this).attr('id');
              console.log('remove:', id);
              var data = JSON.parse( localStorage.getItem( 'data' ) );
              delete data[id];
              localStorage.setItem( 'data', JSON.stringify(data) );
              $(this).remove();
            });
          })
        )
        .appendTo('.footer')
        .click(function(e) {
          $('.container').remove();
          $(this).find('a').each(function (index) {
            console.log($(this).attr('href'));
            loadPanel($(this).attr('href'));
          });
          hideFooter();
        });
    });

  }
  if ($('.workspace').length < 1) {
    hideFooter();
  }
});
