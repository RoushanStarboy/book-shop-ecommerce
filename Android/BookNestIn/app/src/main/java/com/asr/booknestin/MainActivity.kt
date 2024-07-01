package com.asr.booknestin

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.asr.booknestin.ui.theme.BookNestInTheme
import com.example.yourapp.MainView

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            BookNestInTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    BookNestIn(Modifier.padding(innerPadding))
                }
            }
        }
    }
}

@Composable
fun BookNestIn(modifier: Modifier = Modifier) {
    MainView()
}