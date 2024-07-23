package com.asr.booknestin

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET

private val retrofit = Retrofit.Builder().baseUrl("http://10.0.2.2:8000/recommender/api/")
    .addConverterFactory(GsonConverterFactory.create())
    .build()
val bookService = retrofit.create(ApiService::class.java)
interface ApiService {
    @GET("books")
    suspend fun getBooks(): BookResponse
}