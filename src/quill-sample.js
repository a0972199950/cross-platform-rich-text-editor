let Inline = Quill.import('blots/inline');
let Block = Quill.import('blots/block');
let BlockEmbed = Quill.import('blots/block/embed');

class BoldBlot extends Inline { }
BoldBlot.blotName = 'bold';
BoldBlot.tagName = 'strong';

class ItalicBlot extends Inline { }
ItalicBlot.blotName = 'italic';
ItalicBlot.tagName = 'em';

class LinkBlot extends Inline {
  static create(url) {
    let node = super.create();
    node.setAttribute('href', url);
    node.setAttribute('target', '_blank');
    return node;
  }
  
  static formats(node) {
    return node.getAttribute('href');
  }
}
LinkBlot.blotName = 'link';
LinkBlot.tagName = 'a';

class BlockquoteBlot extends Block { }
BlockquoteBlot.blotName = 'blockquote';
BlockquoteBlot.tagName = 'blockquote';

class HeaderBlot extends Block {
  static formats(node) {
    return HeaderBlot.tagName.indexOf(node.tagName) + 1;
  }
}
HeaderBlot.blotName = 'header';
HeaderBlot.tagName = ['H1', 'H2'];

class DividerBlot extends BlockEmbed { }
DividerBlot.blotName = 'divider';
DividerBlot.tagName = 'hr';

class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.url);
    return node;
  }
  
  static value(node) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src')
    };
  }
}
ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';

class VideoBlot extends BlockEmbed {
  static create(url) {
    let node = super.create();
    node.setAttribute('src', url);
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', true);
    return node;
  }
  
  static formats(node) {
    let format = {};
    if (node.hasAttribute('height')) {
      format.height = node.getAttribute('height');
    }
    if (node.hasAttribute('width')) {
      format.width = node.getAttribute('width');
    }
    return format;
  }
  
  static value(node) {
    return node.getAttribute('src');
  }
  
  format(name, value) {
    if (name === 'height' || name === 'width') {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name, value);
      }
    } else {
      super.format(name, value);
    }
  }
}
VideoBlot.blotName = 'video';
VideoBlot.tagName = 'iframe';

Quill.register(BoldBlot);
Quill.register(ItalicBlot);
Quill.register(LinkBlot);
Quill.register(BlockquoteBlot);
Quill.register(HeaderBlot);
Quill.register(DividerBlot);
Quill.register(ImageBlot);
Quill.register(VideoBlot);

let quill = new Quill('#editor-container');

$('#bold-button').click(function() {
  quill.format('bold', true);
});
$('#italic-button').click(function() {
  quill.format('italic', true);
});

$('#link-button').click(function() {
  let value = prompt('Enter link URL');
  quill.format('link', value);
});

$('#blockquote-button').click(function() {
  quill.format('blockquote', true);
});

$('#header-1-button').click(function() {
  quill.format('header', 1);
});

$('#header-2-button').click(function() {
  quill.format('header', 2);
});

$('#divider-button').click(function() {
  let range = quill.getSelection(true);
  quill.insertText(range.index, '\n', Quill.sources.USER);
  quill.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
  quill.setSelection(range.index + 2, Quill.sources.SILENT);
});

$('#image-button').click(function() {
  let range = quill.getSelection(true);
  quill.insertText(range.index, '\n', Quill.sources.USER);
  quill.insertEmbed(range.index + 1, 'image', {
    alt: 'Quill Cloud',
    url: 'https://quilljs.com/0.20/assets/images/cloud.png'
  }, Quill.sources.USER);
  quill.setSelection(range.index + 2, Quill.sources.SILENT);
});

$('#video-button').click(function() {
  let range = quill.getSelection(true);
  quill.insertText(range.index, '\n', Quill.sources.USER);
  let url = 'https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0';
  quill.insertEmbed(range.index + 1, 'video', url, Quill.sources.USER);
  quill.formatText(range.index + 1, 1, { height: '170', width: '400' });
  quill.setSelection(range.index + 2, Quill.sources.SILENT);
});