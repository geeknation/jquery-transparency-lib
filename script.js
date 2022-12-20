var dispPosts = [];
function getPosts(returnCB) {
  $.getJSON('posts.json', function (data) {
    
    returnCB(data);
  });
}
function getPostImage(mediaUrl, returnCB) {
  $.get(mediaUrl, function (mediaData) {
    returnCB(mediaData);
  });
}
getPosts(function (data) {
  var directives = {
   
    postmage: {
      dataImage: function () {
        return this._links['wp:featuredmedia'][0].href;
      },
    },
    postSummary: {
      html: function () {
        return $(this.excerpt.rendered).html();
      },
    },
  };

  $('.container').render(data, directives);

  //load the images.
  $('.container')
    .find('img')
    .each(function (index, image) {
      var imageFetchUrl = $(image).attr('dataimage');
      $.get(imageFetchUrl, function (mediaData) {
        $(image).attr({
          src: mediaData.source_url,
          width: '100%',
          height: '100%',
        });
      });
    });
});
