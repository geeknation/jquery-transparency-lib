var dispPosts = [];
function getPosts(returnCB) {
  $.getJSON('posts.json', function (data) {
    // var post = [];
    // var posts = [];
    // $(data).each(function (index, post) {
    //   getPostImage(
    //     post._links['wp:featuredmedia'][0].href,
    //     function (mediaObj) {
    //       data.postmage = mediaObj.source_url;
    //     }
    //   );
    // });
    // console.log(data);
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
      src: function () {
        return getPostImage(
          this._links['wp:featuredmedia'][0].href,
          function (mediaDAta) {
            return mediaDAta.source_url;
          }
        );
      },
    },
    postSummary: {
      html: function () {
        return $(this.excerpt.rendered).html();
      },
    },
  };

  $('.container').render(data, directives);
});
