<template>
<div>
  <banner
    image='https://via.placeholder.com/800x600'>
  </banner>
  <section
    class='container mx-auto px-4 py-8 text-center lg:w-2/3'>
    <h3 class='my-8 text-2xl tracking-wide uppercase'>
      The Gospel Is Everything
    </h3>
    <p class='my-8 text-5xl font-light leading-tight'>
      Nothing trumps the redeeming work of Jesus on the cross. 
      It shapes what we know, how we worship and how we live our day to day lives.
    </p>
    <p class='text-xl'>
      — It is why we adopt the name <em>Redeemer</em>.
    </p>
  </section>
  <section>
    <div class='flex flex-col container mx-auto md:flex-row'>
      <div class='flex-grow mb-4 col md:text-right md:mr-4'>
        <img class='w-full md:w-auto' src='https://via.placeholder.com/500x350'>
      </div>
      <div class='flex-grow ml-4 col'>
        <div class='m-4'>
          <h3 class='mt-4 mb-8 text-2xl tracking-wide uppercase'>
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
            what naturally follows is a boundless love for our friends, our family and the strangers among us.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section
    class='container mx-auto px-4 py-8 text-center lg:w-2/3'>
    <h3 class='my-8 text-2xl tracking-wide uppercase'>
      Worshiping Through Generosity
    </h3>
    <p class='my-8 text-5xl font-light leading-tight'>
      Generosity is paramount in our sanctification as followers of Christ, who was eternally gracious to us as his adopted sons and daughters.
    </p>
    <p class='text-xl'>
      — We believe in the practice of grace together as a family.
    </p>
  </section>
  <section>
    <div class='flex flex-col container mx-auto md:flex-row'>
      <div class='flex-grow mr-4 md:text-right col'>
        <div class='m-4'>
          <h3 class='mt-4 mb-8 text-2xl tracking-wide uppercase'>
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
  </section>
  <section
    class='container mx-auto px-4 py-8 text-center lg:w-2/3'>
    <h3 class='my-8 text-2xl tracking-wide uppercase'>
      A Church Should Reflect Its Community
    </h3>
    <p class='my-8 text-5xl font-light leading-tight'>
      There are no boundaries in a Christ-driven community. If he is over all and in all, then his Church is to reflect the beauty of his diversity.
    </p>
    <p class='text-xl'>
      — We desire to represent <em>all</em> of Pampa, TX.
    </p>
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
section {
  margin: 6em auto;
}
.col {
  flex-basis: 50%;
}
</style>
