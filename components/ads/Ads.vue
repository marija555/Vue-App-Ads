<template>
  <div class="ads-wrapper">
    <div class="ads-title">
      <h1>Select ads category to see all ads</h1>
    </div>
    <div class="single-ads">
        <div @click="goToCarsAds" class="left-single-ad car-ad">
          <h1 class="single-ad-title">Cars </h1>
          
        </div>
        <div @click="goToPhonesAds" class="right-single-ad phone-ad">
          <h1 class="single-ad-title">Phones </h1>
          
        </div>
        <div @click="goToComputersAds" class="left-single-ad computer-ad">
          <h1 class="single-ad-title">Computers </h1>
          
        </div>
        <div @click="goToAppliancesAds" class="right-single-ad appliances-ad">
          <h1 class="single-ad-title">Appliances </h1>
          
        </div>
        <div @click="goToHomesAds" class="left-single-ad home-ad">
          <h1 class="single-ad-title">Homes </h1>
          
        </div>
        <div @click="goToCosmeticsAds" class="right-single-ad cosmetics-ad">
          <h1 class="single-ad-title">Cosmetics</h1>
          
        </div>
        <div @click="goToJobsAds" class="left-single-ad job-ad">
          <h1 class="single-ad-title">Jobs </h1>
          
        </div>
        <div @click="goToClothesAds" class="right-single-ad clothes-ad">
          <h1 class="single-ad-title">Clothes </h1>
          
        </div>
    </div>
  </div>
</template>

<script>
 export default {
    methods: {
      goToCarsAds() {
        this.$router.push('/ads/cars-ads');
      },
      goToPhonesAds() {
        this.$router.push('/ads/phones-ads');
      },
      goToComputersAds() {
        this.$router.push('/ads/computers-ads');
      },
      goToAppliancesAds() {
        this.$router.push('/ads/appliances-ads');
      },
       goToHomesAds() {
        this.$router.push('/ads/homes-ads');
      },
      goToCosmeticsAds() {
        this.$router.push('/ads/cosmetics-ads');
      },
      goToJobsAds() {
        this.$router.push('/ads/jobs-ads');
      },
      goToClothesAds() {
        this.$router.push('/ads/clothes-ads');
      }
    }
  }
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .ads-wrapper {
    width: 100%;
    height: 91.5vh;
    background: rgb(243, 233, 206);
    display: flex;
    flex-direction: column;
  }
  .ads-title {
    font-family: 'Raleway', sans-serif;
    font-size: 35px;
    font-weight: bold;
    align-self: center;
    padding-top: 40px;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
  .single-ads {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .left-single-ad {
    align-self: flex-start;
    width: 50%;
    height: 50%;
    border: 3px solid rgb(252, 215, 146);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0.85;
  }
  .right-single-ad {
    align-self: flex-end;
    width: 50%;
    height: 50%;
    border: 3px solid rgb(252, 215, 146);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0.85;
  }
  .single-ad-title {
    font-family: 'Indie Flower', cursive;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px black;
  }
  .single-ad-desc {
    font-family: 'Indie Flower', cursive;
    text-align: center;
    width: 80%;
    font-size: 20px;
    color: white;
    text-shadow: 2px 2px black;
  }
  .car-ad {
    background-image: url('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/10best-cars-group-cropped-1542126037.jpg');

    background-repeat: no-repeat;
    background-size: cover;
  }
  .phone-ad {
    background-image: url('https://static.digit.in/default/50c451fd60a33ae80e8475bf9d051f6e73dc580e.jpeg?tr=w-1200');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .cosmetics-ad {
        background-image: url('https://www.globalcosmeticsnews.com/wp-content/uploads/2018/04/cosmetics.jpg');

    background-repeat: no-repeat;
    background-size: cover;
  }
  .computer-ad {
        background-image: url('https://sandstormit.com/wp-content/uploads/2017/12/apple-computer.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .home-ad {
    background-image: url('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/painted-ladies-at-alamo-square-san-francisco-royalty-free-image-138812209-1541445492.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .appliances-ad {
    background-image: url('https://www.resimac.com.au/-/media/Project/Resimac/Australia/News/1440x960_smart_appliances.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .job-ad {
       background-image: url('https://www.expatica.com/app/uploads/sites/4/2014/05/jobs-in-belgium-1920x1080.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .clothes-ad {
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk5Ck_nW7QzxFLdR1XqYIzQpjSWzg6M3rWEw&usqp=CAU');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .left-single-ad:hover {
    opacity: 100%;
    transition: 0.3s ease;
    cursor: pointer;
  }
  .right-single-ad:hover {
    opacity: 100%;
    transition: 0.3s ease;
    cursor: pointer;
  }
</style>