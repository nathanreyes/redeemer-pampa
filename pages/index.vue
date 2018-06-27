<template>
<div>
  <!-- <banner
    image='https://via.placeholder.com/800x600'>
  </banner> -->
  <section class='section-pattern shadow-inner'>
    <div class='container px-4 py-8 text-center lg:w-2/3'>
      <h3 class='mb-8 text-2xl tracking-wide font-serif text-white'>
        The Gospel Is Everything
      </h3>
      <p class='my-8 text-5xl font-light leading-tight text-blue-lightest'>
        Nothing trumps the redeeming work of Jesus on the cross. 
        It shapes what we know, how we worship and how we live our day to day lives.
      </p>
      <p class='text-xl font-light pt-8 italic text-blue-lighter'>
        It is why we adopt the name <em>Redeemer</em>.
      </p>
    </div>
  </section>
  <section class='section-margin'>
    <div class='container'>
      <div class='flex flex-col md:flex-row'>
        <div class='flex-grow mb-4 col md:text-right md:mr-4'>
          <img class='w-full md:w-auto' src='https://via.placeholder.com/500x350'>
        </div>
        <div class='flex-grow ml-4 col'>
          <div class='m-4'>
            <h3 class='mt-4 mb-8 text-2xl tracking-wide font-serif uppercase'>
              Living Sent
            </h3>
            <p class='italic text-grey-darkest text-right leading-normal tracking-wide'>
              "I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing."
            </p>
            <p class='text-grey font-bold text-sm text-right mt-3'>
              - John 15:5
            <p>
            <p class='text-xl mt-4 leading-normal'>
              To follow Jesus is to be on mission. As we grow closer to him and allow the Spirit to transform our lives,
              a boundless love for our friends, our family and the strangers among us naturally follows.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class='section-pattern-light shadow-inner'>
    <div
      class='container px-4 py-8 text-center lg:w-2/3 light'>
      <h3 class='mb-8 text-2xl tracking-wide font-serif text-blue-darkest'>
        Worship Through Generosity
      </h3>
      <p class='my-8 text-5xl font-light leading-tight text-blue-darker'>
        Generosity is paramount in our sanctification as followers of Christ, who is eternally gracious to us as his adopted sons and daughters.
      </p>
      <p class='text-xl pt-8 font-light italic text-blue-darkest'>
        We believe in the practice of grace together as a family.
      </p>
    </div>
  </section>
  <section class='section-margin'>
    <div class='container'>
      <div class='flex flex-col md:flex-row'>
        <div class='flex-grow mr-4 md:text-right col'>
          <div class='m-4'>
            <h3 class='mt-4 mb-8 text-2xl tracking-wide font-serif uppercase'>
              Simple Obedience
            </h3>
            <p class='italic text-grey-darkest text-right leading-normal tracking-wide'>
              "Be still and know that I am God."
            </p>
            <p class='text-grey font-bold text-sm text-right mt-3'>
              - Psalm 46:10
            <p>
            <p class='text-xl mt-4 leading-normal'>
              Simple living and worship is an intentional acknowledgment of our dependance on Christ.
              Not only does it prevent us from getting lost in rituals and religious activities, it naturally guides us by simply asking,
            </p>
            <p class='tracking-wide text-2xl mt-2 font-light italic text-grey-darker'>
              "Does this advance our mission of spreading the Gospel or equipping the saints?"
            </p>
          </div>
        </div>
        <div class='flex-grow mb-4 col md:ml-4'>
          <img class='w-full md:w-auto' src='https://via.placeholder.com/500x350'>
        </div>
      </div>
    </div>
  </section>
  <section class='section-pattern text-blue-lightest shadow-inner'>
    <div class='container mx-auto px-4 py-8 text-center lg:w-2/3'>
      <h3 class='mb-8 text-2xl tracking-wide font-serif text-white'>
        A Church That Reflects Its Community
      </h3>
      <p class='my-8 text-5xl font-light leading-tight text-blue-lightest'>
        There are no boundaries in a Christ-driven community. If he is over all and in all,
        then his Church is to reflect the beauty of the diversity of His creation.
      </p>
      <p class='text-xl font-light pt-6 text-blue-lighter'>
        — We desire to represent <em>all</em> of Pampa, TX.
      </p>
    </div>
  </section>
  <section class='section-margin'>
    <div class='flex flex-col container mx-auto md:flex-row'>
      <div class='flex-grow mb-4 col md:text-right md:mr-4'>
        <img class='w-full md:w-auto' src='https://via.placeholder.com/500x350'>
      </div>
      <div class='flex-grow ml-4 col'>
        <div class='m-4'>
          <h3 class='mt-4 mb-8 text-2xl tracking-wide font-serif uppercase'>
            Come As You Are
          </h3>
          <p class='italic text-grey-darkest text-right leading-normal tracking-wide'>
            "I believe; help my unbelief!"
          </p>
          <p class='text-grey font-bold text-sm text-right mt-3'>
            - Mark 9:24
          <p>
          <p class='text-xl mt-4 leading-normal'>
            God doesn't want a self-perfecting version of ourselves.
            It is our vulnerable, repentant hearts that bring us closer to Him through his Spirit.
            With his power, we can cultivate a boldness to beat back sin.
          </p>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import Banner from '../components/Banner';

export default {
  components: {
    Banner,
  },
};
</script>

<style scoped>
.section-pattern,
.section-pattern-light {
  padding-top: 6em;
  padding-bottom: 6em;
}

.section-pattern {
  background-color: #2779bd;
  background-image: url("data:image/svg+xml,%3Csvg width='84' height='84' viewBox='0 0 84 84' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233490dc' fill-opacity='0.4'%3E%3Cpath d='M84 23c-4.417 0-8-3.584-8-7.998V8h-7.002C64.58 8 61 4.42 61 0H23c0 4.417-3.584 8-7.998 8H8v7.002C8 19.42 4.42 23 0 23v38c4.417 0 8 3.584 8 7.998V76h7.002C19.42 76 23 79.58 23 84h38c0-4.417 3.584-8 7.998-8H76v-7.002C76 64.58 79.58 61 84 61V23zM59.05 83H43V66.95c5.054-.5 9-4.764 9-9.948V52h5.002c5.18 0 9.446-3.947 9.95-9H83v16.05c-5.054.5-9 4.764-9 9.948V74h-5.002c-5.18 0-9.446 3.947-9.95 9zm-34.1 0H41V66.95c-5.053-.502-9-4.768-9-9.948V52h-5.002c-5.184 0-9.447-3.946-9.95-9H1v16.05c5.053.502 9 4.768 9 9.948V74h5.002c5.184 0 9.447 3.946 9.95 9zm0-82H41v16.05c-5.054.5-9 4.764-9 9.948V32h-5.002c-5.18 0-9.446 3.947-9.95 9H1V24.95c5.054-.5 9-4.764 9-9.948V10h5.002c5.18 0 9.446-3.947 9.95-9zm34.1 0H43v16.05c5.053.502 9 4.768 9 9.948V32h5.002c5.184 0 9.447 3.946 9.95 9H83V24.95c-5.053-.502-9-4.768-9-9.948V10h-5.002c-5.184 0-9.447-3.946-9.95-9zM50 50v7.002C50 61.42 46.42 65 42 65c-4.417 0-8-3.584-8-7.998V50h-7.002C22.58 50 19 46.42 19 42c0-4.417 3.584-8 7.998-8H34v-7.002C34 22.58 37.58 19 42 19c4.417 0 8 3.584 8 7.998V34h7.002C61.42 34 65 37.58 65 42c0 4.417-3.584 8-7.998 8H50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  /* background-color: #1c3d5a;
  background-image: url("data:image/svg+xml,%3Csvg width='84' height='84' viewBox='0 0 84 84' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2312283a' fill-opacity='0.27'%3E%3Cpath d='M84 23c-4.417 0-8-3.584-8-7.998V8h-7.002C64.58 8 61 4.42 61 0H23c0 4.417-3.584 8-7.998 8H8v7.002C8 19.42 4.42 23 0 23v38c4.417 0 8 3.584 8 7.998V76h7.002C19.42 76 23 79.58 23 84h38c0-4.417 3.584-8 7.998-8H76v-7.002C76 64.58 79.58 61 84 61V23zM59.05 83H43V66.95c5.054-.5 9-4.764 9-9.948V52h5.002c5.18 0 9.446-3.947 9.95-9H83v16.05c-5.054.5-9 4.764-9 9.948V74h-5.002c-5.18 0-9.446 3.947-9.95 9zm-34.1 0H41V66.95c-5.053-.502-9-4.768-9-9.948V52h-5.002c-5.184 0-9.447-3.946-9.95-9H1v16.05c5.053.502 9 4.768 9 9.948V74h5.002c5.184 0 9.447 3.946 9.95 9zm0-82H41v16.05c-5.054.5-9 4.764-9 9.948V32h-5.002c-5.18 0-9.446 3.947-9.95 9H1V24.95c5.054-.5 9-4.764 9-9.948V10h5.002c5.18 0 9.446-3.947 9.95-9zm34.1 0H43v16.05c5.053.502 9 4.768 9 9.948V32h5.002c5.184 0 9.447 3.946 9.95 9H83V24.95c-5.053-.502-9-4.768-9-9.948V10h-5.002c-5.184 0-9.447-3.946-9.95-9zM50 50v7.002C50 61.42 46.42 65 42 65c-4.417 0-8-3.584-8-7.998V50h-7.002C22.58 50 19 46.42 19 42c0-4.417 3.584-8 7.998-8H34v-7.002C34 22.58 37.58 19 42 19c4.417 0 8 3.584 8 7.998V34h7.002C61.42 34 65 37.58 65 42c0 4.417-3.584 8-7.998 8H50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); */
}

.section-pattern-light {
  background-color: #eff8ff;
  background-image: url("data:image/svg+xml,%3Csvg width='84' height='84' viewBox='0 0 84 84' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23bcdefa' fill-opacity='0.43'%3E%3Cpath d='M84 23c-4.417 0-8-3.584-8-7.998V8h-7.002C64.58 8 61 4.42 61 0H23c0 4.417-3.584 8-7.998 8H8v7.002C8 19.42 4.42 23 0 23v38c4.417 0 8 3.584 8 7.998V76h7.002C19.42 76 23 79.58 23 84h38c0-4.417 3.584-8 7.998-8H76v-7.002C76 64.58 79.58 61 84 61V23zM59.05 83H43V66.95c5.054-.5 9-4.764 9-9.948V52h5.002c5.18 0 9.446-3.947 9.95-9H83v16.05c-5.054.5-9 4.764-9 9.948V74h-5.002c-5.18 0-9.446 3.947-9.95 9zm-34.1 0H41V66.95c-5.053-.502-9-4.768-9-9.948V52h-5.002c-5.184 0-9.447-3.946-9.95-9H1v16.05c5.053.502 9 4.768 9 9.948V74h5.002c5.184 0 9.447 3.946 9.95 9zm0-82H41v16.05c-5.054.5-9 4.764-9 9.948V32h-5.002c-5.18 0-9.446 3.947-9.95 9H1V24.95c5.054-.5 9-4.764 9-9.948V10h5.002c5.18 0 9.446-3.947 9.95-9zm34.1 0H43v16.05c5.053.502 9 4.768 9 9.948V32h5.002c5.184 0 9.447 3.946 9.95 9H83V24.95c-5.053-.502-9-4.768-9-9.948V10h-5.002c-5.184 0-9.447-3.946-9.95-9zM50 50v7.002C50 61.42 46.42 65 42 65c-4.417 0-8-3.584-8-7.998V50h-7.002C22.58 50 19 46.42 19 42c0-4.417 3.584-8 7.998-8H34v-7.002C34 22.58 37.58 19 42 19c4.417 0 8 3.584 8 7.998V34h7.002C61.42 34 65 37.58 65 42c0 4.417-3.584 8-7.998 8H50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
