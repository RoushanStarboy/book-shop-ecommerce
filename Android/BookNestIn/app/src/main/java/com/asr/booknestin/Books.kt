package com.asr.booknestin

data class Books(
    val ISBN: String,
//    val BookTitle: String,
    val BookAuthor: String,
    val YearOfPublication: Int,
    val Publisher: String,
    val ImageURLS: String,
    val ImageURLM: String,
//    val ImageURLL: String,
    val Price: Double,
    val BookTitle: String? = null,
    val ImageURLL: String? = null
)

data class BookResponse(val books: List<Books>)

