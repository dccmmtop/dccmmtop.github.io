$(function() {
  'use strict';

  if(!document.queryCommandSupported('copy')) {
    return;
  }

  function flashCopyMessage(el, msg) {
    el.textContent = msg;
    setTimeout(function() {
      el.textContent = "Copy";
    }, 1000);
  }

  function selectText(node) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
    return selection;
  }



  function addCopyButton(containerEl) {
    console.log("添加复制")
    var copyBtn = document.createElement("button");
    copyBtn.className = "highlight-copy-btn hidden";
    copyBtn.textContent = "Copy";

    var codeEl = containerEl.firstElementChild;
    copyBtn.addEventListener('click', function() {
      try {
        var selection = selectText(codeEl);
        document.execCommand('copy');
        selection.removeAllRanges();

        flashCopyMessage(copyBtn, 'Copied!')
      } catch(e) {
        console && console.log(e);
        flashCopyMessage(copyBtn, 'Failed :\'(')
      }
    });

    containerEl.appendChild(copyBtn);
  }

  // Add copy button to code blocks
  // var highlightBlocks = document.getElementsByClassName('highlight');
  var highlightBlocks = $(".highlight");
  console.log("获取代码块: " +   highlightBlocks.length)
  for(var i =0 ; i< highlightBlocks.length; i ++) {
    addCopyButton(highlightBlocks[i])
  }
  
  $(".highlight").hover(function(){
    $(this).children("button")[0].setAttribute('style', 'display : block !important');
  },function(){
    $(this).children("button")[0].setAttribute('style', 'display : none !important');
  });
});
