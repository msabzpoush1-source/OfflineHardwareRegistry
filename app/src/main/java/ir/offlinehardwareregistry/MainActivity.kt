package ir.offlinehardwareregistry

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { MaterialTheme { WelcomeScreen() } }
    }
}

@Composable
private fun WelcomeScreen() {
    Surface(Modifier.fillMaxSize()) {
        Column(
            Modifier.fillMaxSize().padding(24.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Card {
                Column(Modifier.padding(24.dp)) {
                    Text("ثبت آفلاین تجهیزات سخت‌افزاری",
                        style = MaterialTheme.typography.headlineSmall,
                        textAlign = TextAlign.Center)
                    Text(
                        "اسکلت اولیه برنامه آماده ساخت ابری است. قابلیت‌های ثبت دستگاه‌ها، قطعات، تاریخچه و خروجی ZIP در مراحل بعد اضافه می‌شوند.",
                        Modifier.padding(top = 16.dp), fontSize = 16.sp,
                        textAlign = TextAlign.Center, lineHeight = 26.sp
                    )
                }
            }
        }
    }
}
