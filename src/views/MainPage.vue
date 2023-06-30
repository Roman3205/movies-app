<script>
import axios from 'axios'

export default {

    data() {
        return {
            action: [],
            thrillers: [],
            fantasy: [],
            top: [],
            search: '',
            movies: []
        }
    },

    mounted() {
        this.loadPage()
    },

    watch: {
        search: {
            handler: 'searchMovies',
            immediate: true
        }
    },

    methods: {
        async loadPage() {
            await this.loadAction()
            await this.loadTop()
            await this.loadThrillers()
            await this.loadFantasy()
        },

        async loadAction() {
            let response = await axios.get('/action')
            this.action = response.data
        },

        async loadFantasy() {
            let response = await axios.get('/fantasy')
            this.fantasy = response.data
        },

        async loadTop() {
            let response = await axios.get('/top')
            this.top = response.data
        },

        async loadThrillers() {
            let response = await axios.get('/thriller')
            this.thrillers = response.data
        },

        async searchMovies() {
            let response = await axios.get('/all')
            let movies = response.data
            let regex = new RegExp(this.search, 'i')
            this.movies = movies.filter((movie) => regex.test(movie.title))
        },

        goMovie(item) {
            this.$router.push({
                name: 'movie',
                params: {
                    id: item._id
                }
            })
        },

        scrollLeft(ref) {
            const row = this.$refs[ref];
            row.scrollBy({
                left: -600,
                behavior: "smooth",
            })
        },

        scrollRight(ref) {
            const row = this.$refs[ref]
            row.scrollBy({
                left: 600,
                behavior: "smooth",
            })
        }
  }
}
</script>

<template>

<div class="search-block mt-4">
    <h5 class="mb-3">Search movies here</h5>
    <input type="text" class="form-control" placeholder="Search movies" v-model="search" >
</div>

<div class="films-container mt-5">
    <h2 v-if="search && movies.length != 0">Results</h2>
    <h2 v-if="movies.length == 0">No results</h2>
    <div class="row ms-1 mt-3 ms-2" v-if="search" ref="All">
        <div class="film-card" v-for="(item) in movies" @click="goMovie(item)" >
            <img :src="item.image" alt="">
        </div>
    </div>
    <div class="buttons mt-4 ms-2" v-if="search && movies.length != 0">
        <button class="scroll-button left" @click="scrollLeft('All')">&#8249;</button>
        <button class="scroll-button right" @click="scrollRight('All')">&#8250;</button>
    </div>
    <div class="no-search" v-if="!search">
        <div class="top-rated mt-5">
        <h2>Top-rated</h2>
        <div class="box">
            <div class="row ms-1 mt-3 ms-2" ref="TopRated">
                <div class="film-card" v-for="(item) in top" @click="goMovie(item)" >
                    <img :src="item.image" alt="">
                </div>
            </div>
            <div class="buttons mt-4 ms-2">
                <button class="scroll-button left" @click="scrollLeft('TopRated')">&#8249;</button>
                <button class="scroll-button right" @click="scrollRight('TopRated')">&#8250;</button>
            </div>
        </div>
    </div>

    <div class="action-films mt-5">
        <h2>Action</h2>
        <div class="box">
            <div class="row ms-1 mt-3 ms-2" ref="Action">
                <div class="film-card" v-for="(item) in action" @click="goMovie(item)" >
                    <img :src="item.image" alt="">
                </div>
            </div>
            <div class="buttons mt-4 ms-2">
                <button class="scroll-button left" @click="scrollLeft('Action')">&#8249;</button>
                <button class="scroll-button right" @click="scrollRight('Action')">&#8250;</button>
            </div>
        </div>
    </div>

    <div class="thrillers-films mt-5">
        <h2>Thrillers</h2>
        <div class="box">
            <div class="row ms-1 mt-3 ms-2" ref="Thrillers">
                <div class="film-card" v-for="(item) in thrillers" @click="goMovie(item)" >
                    <img :src="item.image" alt="">
                </div>
            </div>
            <div class="buttons mt-4 ms-2">
                <button class="scroll-button left" @click="scrollLeft('Thrillers')">&#8249;</button>
                <button class="scroll-button right" @click="scrollRight('Thrillers')">&#8250;</button>
            </div>
        </div>
    </div>

    <div class="fantasy-films mt-5">
        <h2>Fantasy</h2>
        <div class="box">
            <div class="row ms-1 mt-3 ms-2" ref="Fantasy">
                <div class="film-card" v-for="(item) in fantasy" @click="goMovie(item)" >
                    <img :src="item.image" alt="">
                </div>
            </div>
            <div class="buttons mt-4 ms-2">
                <button class="scroll-button left" @click="scrollLeft('Fantasy')">&#8249;</button>
                <button class="scroll-button right" @click="scrollRight('Fantasy')">&#8250;</button>
            </div>
        </div>
    </div>
    </div>
</div>

</template>

<style scoped>
    .row {
        gap: 30px;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        width: 1275px;
    }

    .row::-webkit-scrollbar {
        display: none;
    }

    .film-card {
        width: 330px;
        height: 390px;
        border-radius: 10px;
        background-color: gray;
        padding: 0px;
    }

    .film-card img {
        width: inherit;
        height: inherit;
        border-radius: inherit;
        cursor: pointer;
    }

    .scroll-button {
        height: 90px;
        border-radius: 5px;
        background-color: rgba(204, 203, 203, 0.6);;
        border: none;
        width: 50px;
        align-self: center;
        font-size: 35px;
        font-weight: bold;
        text-align: center;
        transition: 0.6s;
    }

    .scroll-button:hover {
        opacity: 0.7;
    }

    .buttons {
        display: flex;
        gap: 15px;
    }
</style>
