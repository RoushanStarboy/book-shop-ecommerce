package com.asr.booknestin

import android.util.Log
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

class MainViewModel : ViewModel() {

    private val _booksState = mutableStateOf(BookState())
    val booksState: State<BookState> = _booksState

    init {
        fetchBooks()
    }

    private fun fetchBooks() {
        viewModelScope.launch {
            _booksState.value = BookState(loading = true)
            try {
                val books = bookService.getBooks()
                Log.d("MainViewModel", "Books fetched: ${books.books}")
                _booksState.value = BookState(list = books.books, loading = false)
            } catch (e: Exception) {
                Log.e("MainViewModel", "Error fetching books: ${e.message}")
                _booksState.value = BookState(loading = false, error = e.message)
            }
        }
    }

    data class BookState(
        val loading: Boolean = true,
        val list: List<Books> = emptyList(),
        val error: String? = null
    )
}