var $form = $('.form');
$form.find('.btn').on('click', function(){
  if (!confirm('登録してもよろしいでしょうか')) {
    return;
  }
  $form.submit();
  $(this).prop('disabled', true);
});
