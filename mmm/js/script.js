$(document).ready(() => {
  const $window = $('.window');
  const $toolbar = $window.find('.toolbar');
  const $buttonContainer = $toolbar.find('.button-container');

  let mobile = null;

  $buttonContainer.click(function () {
    if (mobile) {
      const [buttonClose] = $(this).find('.button-close');
      buttonClose.click();
    }
  });
});
