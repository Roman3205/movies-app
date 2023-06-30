<script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {

    data() {
        return {
            movie: null,
            feedbacks: [],
            text: '',
            isCreated: null
        }
    },

    mounted() {
        this.loadMovie()
    },

    methods: {
        async loadMovie() {
            let response = await axios.get('/movie', {
                params: {
                    id: this.$route.params.id
                }
            })
            this.movie = response.data
            this.feedbacks = response.data.reviews
        },

        getData(data) {
            let day = dayjs(data).format('DD MMMM  HH:mm')
            return day
        },

        async sendReview(e) {
            e.preventDefault()
            if(this.text !== '') {
                await axios.post('/review', {
                    text: this.text,
                    id: this.movie._id
                })
                this.text = ''
                this.loadMovie()
                this.isCreated = true
            } else if(this.text === '') {
                this.isCreated = false
            }
        }
    }
}

</script>

<template>
    <div class="container" v-if="movie">
        <div class="main-box">
            <div>
                <div class="iframe">
                    <iframe allowfullscreen="true" frameborder="0" scrolling="no" :src="movie.link"></iframe>
                </div>
                <div class="feedbacks mt-5">
                    <div class="feedbacks-all mt-2">
                        <div class="review" v-for="(item) in feedbacks" >
                            <div class="author"><h5><b>{{ item.author }}</b></h5> <span>{{ getData(item.createdAt) }}</span></div>
                            <p>{{ item.text }}</p>
                        </div>
                    </div>
                    <div class="create-feedback">
                        <h3>Leave a review</h3>
                        <form id="send-data" @submit="sendReview" >
                            <div class="mb-3">
                                <textarea v-model="text" class="form-control" rows="5" name="description" placeholder="Review text"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary px-4 py-2">Send</button>
                        </form>
                        <div class="alert alert-primary" v-if="isCreated" >Your review was created successfully</div>
                        <div class="alert alert-danger" v-else-if="isCreated == false" >Fill all fields</div>
                    </div>
                </div>
            </div>
            <div class="content">
                <h1>{{ movie.title }}</h1>
                <span class="info-film mt-3"><h5>{{ movie.year }}</h5> <button class="btn btn-secondary" disabled>{{ movie.ageLimit }}+</button></span>
                <div class="rating">
                    <h3 class="mt-3">Rating: <button class="ms-2 btn btn-success" disabled>{{ movie.rating }}</button></h3>
                </div>
                <h5 class="mt-4"><i>Brief plot:</i></h5>
                <p>{{ movie.briefPlot }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .container {
        margin-top: 60px;
    }

    iframe {
        width: 800px;
        height: 400px;
        border-radius: 10px;
    }

    .info-film {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .feedbacks-all {
        max-width: 400px;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .rating {
        display: flex;
    }

    .rating button {
        opacity: 1;
        font-weight: bold;
        transform: scale(1.1);
        align-self: center;
        margin-top: -4px;
    }

    .btn-secondary {
        transform: scale(0.75);
        margin-top: -7px;
        opacity: 1;
    }

    .main-box {
        display: flex;
        gap: 150px;
        justify-content: space-around;
    }

    form {
        width: 310px;
        display: flex;
        flex-direction: column;
    }

    .feedbacks {
        display: flex;
        justify-content: space-between;
    }

    .create-feedback {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .review {
        border: 2px solid black;
        border-radius: 10px;
        padding: 10px;
    }

    .author {
        display: flex;
        gap: 10px;
    }

    .author span {
        color: dimgray;
        font-weight: bold;
    }

    .create-feedback button {
        align-self: flex-end;
    }
</style>
