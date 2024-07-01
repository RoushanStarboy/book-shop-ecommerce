package com.example.yourapp

import AccountScreen
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.asr.booknestin.Screens.CategoryScreen
import com.asr.booknestin.Screens.HomeScreen
import com.asr.booknestin.Screens.MenuScreen
import java.util.Locale

@Composable
fun MainView() {
    val navController = rememberNavController()
    Scaffold(
        topBar = { TopNavigationBar(navController) },
        bottomBar = { BottomNavigationBar(navController) }
    ) { innerPadding ->
        NavHostContainer(navController, Modifier.padding(innerPadding))
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TopNavigationBar(navController: NavController) {
    var searchExpanded by remember { mutableStateOf(false) }
    var searchText by remember { mutableStateOf("") }

    TopAppBar(
        title = {
            if (searchExpanded) {
                BasicTextField(
                    value = searchText,
                    onValueChange = { searchText = it },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )
            } else {
                Text(text = "BookNest.In", fontSize = 20.sp)
            }
        },
        actions = {
            OutlinedButton(onClick = { searchExpanded = !searchExpanded }) {
                Icon(Icons.Default.Search, contentDescription = "Search")
            }
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = MaterialTheme.colorScheme.primaryContainer,
            titleContentColor = MaterialTheme.colorScheme.primary,
        )
    )
}

@Composable
fun BottomNavigationBar(navController: NavController) {
    var selectedItem by remember { mutableIntStateOf(0) }
    val items = listOf("Home", "Category", "Account", "Menu")
    val icons = listOf(
        Icons.Filled.Home,
        Icons.Filled.Favorite,
        Icons.Filled.AccountCircle,
        Icons.Filled.Menu
    )

    NavigationBar(
        containerColor = MaterialTheme.colorScheme.inversePrimary
    ) {
        items.forEachIndexed { index, item ->
            NavigationBarItem(
                icon = { Icon(icons[index], contentDescription = item) },
                label = { Text(item.capitalize(Locale.ROOT)) },
                selected = selectedItem == index,
                onClick = {
                    selectedItem = index
                    navController.navigate(item)
                },
                colors = NavigationBarItemDefaults.colors(
                    selectedIconColor = MaterialTheme.colorScheme.onPrimary,
                    unselectedIconColor = MaterialTheme.colorScheme.onPrimary.copy(alpha = 0.6f)
                )
            )
        }
    }
}

@Composable
fun NavHostContainer(navController: NavHostController, modifier: Modifier) {
    NavHost(navController, startDestination = "home", modifier = modifier) {
        composable("Home") { HomeScreen(navController) }
        composable("Category") { CategoryScreen(navController) }
        composable("Account") { AccountScreen(navController) }
        composable("Menu") { MenuScreen(navController) }
    }
}

