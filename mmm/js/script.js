$(document).ready(() => {
  const $window = $('.window');
  const $toolbar = $window.find('.toolbar');
  const $buttonContainer = $toolbar.find('.button-container');
  const $html = $('html');

  let desktop = null;
  let mobile = null;

  $buttonContainer.click(function () {
    if (mobile) {
      const [buttonClose] = $(this).find('.button-close');
      buttonClose.click();
    }
  });

  const onResize = () => {
    const { clientWidth } = document.body;
    desktop = clientWidth > 512;
    mobile = !desktop;
    $html.toggleClass('desktop', desktop);
    $html.toggleClass('mobile', mobile);
  };
  onResize();
  window.onresize = onResize;
});
