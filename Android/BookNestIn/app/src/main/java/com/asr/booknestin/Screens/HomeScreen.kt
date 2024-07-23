package com.asr.booknestin.Screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import coil.compose.rememberAsyncImagePainter
import com.asr.booknestin.Books
import com.asr.booknestin.MainViewModel

@Composable
fun HomeScreen(navController: NavController, modifier: Modifier = Modifier) {
    val booksViewModel: MainViewModel = viewModel()
    val viewState by booksViewModel.booksState
    Box(modifier = Modifier.fillMaxSize()) {
        when {
            viewState.loading -> {
                CircularProgressIndicator(modifier = Modifier.align(Alignment.Center))
            }
            viewState.error != null -> {
                Text(
                    text = "Error Occurred: ${viewState.error}",
                    modifier = Modifier.align(Alignment.Center),
                    color = Color.Red
                )
            }
            viewState.list.isNotEmpty() -> {
                BookScreen(books = viewState.list)
            }
            else -> {
                Text("No books available", modifier = Modifier.align(Alignment.Center))
            }
        }
    }
}

@Composable
fun BookScreen(books: List<Books>) {
    LazyVerticalGrid(columns = GridCells.Fixed(2), modifier = Modifier.fillMaxSize()) {
        items(books) { book ->
            BookItem(books = book)
        }
    }
}

@Composable
fun BookItem(books: Books) {
    Column(
        modifier = Modifier
            .padding(8.dp)
            .fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        val painter = rememberAsyncImagePainter(books.ImageURLL ?: "")
        Image(
            painter = painter,
            contentDescription = null,
            modifier = Modifier
                .fillMaxWidth()
                .aspectRatio(1f)
        )
        Text(
            text = books.BookTitle ?: "No Title",
            color = Color.Black,
            style = TextStyle(fontWeight = FontWeight.Bold),
            modifier = Modifier.padding(top = 4.dp)
        )
    }
}