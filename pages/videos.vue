<template>
  <div class="section">
    <h2 class="section-title" id="videos">{{ title }}</h2>
    <master-detail-list
      :groups="groups"
      :items="videos"
      :selected-item.sync="selectedVideo"
    >
      <div v-if="selectedVideo">
        <div
          class="fb-video"
          :data-href="selectedVideo.url"
          data-allowfullscreen="true"
          data-width="500"
        ></div>
      </div>
    </master-detail-list>
  </div>
</template>

<script>
import axios from 'axios';
import MasterDetailList from '../components/MasterDetailList';

export default {
  name: 'Videos',
  components: {
    MasterDetailList,
  },
  data() {
    return {
      videos: [],
      selectedVideo: null,
    };
  },
  computed: {
    title() {
      let title = 'Videos';
      if (this.selectedVideo) {
        title += ` - ${this.selectedVideo.title}`;
      }
      return title;
    },
    groups() {
      return [
        {
          title: 'By Title',
          match: item => true,
        },
      ];
    },
  },
  mounted() {
    this.fetchVideoFeed();
  },
  methods: {
    fetchVideoFeed() {
      const appsecret_proof = 'd75fd71cdfa263fb521780f28f5e0995';
      const access_token =
        'EAAk6asCrzIUBAFoWd4MppzgldZCQq5IfMprA3dZCNmgTnmVtz1n9koxK5GlIWm2nnXK7ye72Nap3XlrvGZCQZBQGYl8aAKATvMEvKgLZCDEnSB8mJmZC7KDL2MQtVXb5bSdpgQCUNDHOIpyNbEZAn1r5detOuCHe3IZD';
      FB.api('/RedeemerPampa/videos', 'get', { access_token }, response => {
        if (!response || response.error) {
          alert('Error occured');
          console.log('Error fetching videos', response.error);
        } else {
          const urlPrefix = 'https://www.facebook.com/facebook/videos/';
          this.videos = response.data.map(video => ({
            title: video.description || video.updated_time,
            date: video.updated_time,
            url: urlPrefix + video.id,
            path: urlPrefix + video.id,
          }));
        }
      });
      // axios
      //   .get(url, {
      //     params: {
      //       access_token,
      //     },
      //   })
      //   .then(result => {
      //     this.videos = result.data.data.map(video => ({
      //       title: video.description || video.updated_time,
      //       date: video.updated_time,
      //       url: urlPrefix + video.id,
      //       path: urlPrefix + video.id,
      //     }));
      //   })
      //   .catch(err => {
      //     console.log('error', err);
      //   });
    },
  },
};
</script>