/*
 * Template Name: Unify - Responsive Bootstrap Template
 * Description: Business, Corporate, Portfolio, E-commerce and Blog Theme.
 * Version: 1.7
 * Author: @htmlstream
 * Website: http://htmlstream.com
*/

var App = function () {
  //Fixed Header
  function handleHeader() {
    jQuery(window).scroll(function () {
      if (jQuery(window).scrollTop() > 100) {
        jQuery(".header-fixed .header-sticky").addClass("header-fixed-shrink");
      }
      else {
        jQuery(".header-fixed .header-sticky").removeClass("header-fixed-shrink");
      }
    });
  }

  //Header Mega Menu
  function handleMegaMenu() {
    jQuery(document).on('click', '.mega-menu .dropdown-menu', function (e) {
      e.stopPropagation();
    })
  }

  //Search Box (Header)
  function handleSearch() {
    jQuery('.search').click(function () {
      if (jQuery('.search-btn').hasClass('fa-search')) {
        jQuery('.search-open').fadeIn(500);
        jQuery('.search-btn').removeClass('fa-search');
        jQuery('.search-btn').addClass('fa-times');
      } else {
        jQuery('.search-open').fadeOut(500);
        jQuery('.search-btn').addClass('fa-search');
        jQuery('.search-btn').removeClass('fa-times');
      }
    });
  }

  //Search Box v1 (Header v5)
  function handleSearchV1() {
    jQuery('.header-v5 .search-button').click(function () {
      jQuery('.header-v5 .search-open').slideDown();
    });

    jQuery('.header-v5 .search-close').click(function () {
      jQuery('.header-v5 .search-open').slideUp();
    });

    jQuery(window).scroll(function () {
      if (jQuery(this).scrollTop() > 1) jQuery('.header-v5 .search-open').fadeOut('fast');
    });
  }

  //Sidebar Navigation Toggle
  function handleToggle() {
    jQuery('.list-toggle').on('click', function () {
      jQuery(this).toggleClass('active');
    });
  }

  //Equal Height Columns    
  function handleEqualHeightColumns() {
    var EqualHeightColumns = function () {
      $(".equal-height-columns").each(function () {
        heights = [];
        $(".equal-height-column", this).each(function () {
          $(this).removeAttr("style");
          heights.push($(this).height()); // write column's heights to the array
        });
        $(".equal-height-column", this).height(Math.max.apply(Math, heights)); //find and set max
      });
    }

    EqualHeightColumns();
    $(window).resize(function () {
      EqualHeightColumns();
    });
    $(window).load(function () {
      EqualHeightColumns("img.equal-height-column");
    });
  }    

  //Hover Selector
  function handleHoverSelector() {
    $('.hoverSelector').on('hover', function (e) {
      $('.hoverSelectorBlock', this).toggleClass('show');
      e.stopPropagation();
    });
  }    

  //Bootstrap Tooltips and Popovers
  function handleBootstrap() {
    /*Bootstrap Carousel*/
    jQuery('.carousel').carousel({
      interval: 15000,
      pause: 'hover'
    });

    /*Tooltips*/
    jQuery('.tooltips').tooltip();
    jQuery('.tooltips-show').tooltip('show');
    jQuery('.tooltips-hide').tooltip('hide');
    jQuery('.tooltips-toggle').tooltip('toggle');
    jQuery('.tooltips-destroy').tooltip('destroy');       

    /*Popovers*/
    jQuery('.popovers').popover();
    jQuery('.popovers-show').popover('show');
    jQuery('.popovers-hide').popover('hide');
    jQuery('.popovers-toggle').popover('toggle');
    jQuery('.popovers-destroy').popover('destroy');
  }

  return {
    init: function () {
      handleBootstrap();
      handleSearch();
      handleSearchV1();
      handleToggle();
      handleHeader();
      handleMegaMenu();
      handleHoverSelector();
      handleEqualHeightColumns();
    }
  };
} ();