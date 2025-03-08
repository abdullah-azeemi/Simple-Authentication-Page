import { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  AppBar, 
  Toolbar,
  Paper,
  Grid,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Person, 
  Email, 
  DateRange, 
  ExitToApp,
  Edit,
} from '@mui/icons-material';

const HomePage = ({ setIsAuthenticated }) => {
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    joinDate: new Date().toISOString(),
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // You would need to implement this endpoint in your backend
          const response = await axios.get('http://localhost:5000/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
            Dashboard
          </Typography>
          <Button
            onClick={handleLogout}
            startIcon={<ExitToApp />}
            color="inherit"
            sx={{ color: 'text.primary' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4,
                textAlign: 'center',
                position: 'relative',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              }}
            >
              <IconButton 
                sx={{ 
                  position: 'absolute', 
                  right: 16, 
                  top: 16,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'background.default' },
                }}
              >
                <Edit />
              </IconButton>
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem',
                  margin: '0 auto 24px',
                  border: '4px solid #fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                {userData.firstName?.[0]}{userData.lastName?.[0]}
              </Avatar>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {userData.firstName} {userData.lastName}
              </Typography>
              <Typography color="textSecondary" sx={{ mb: 2 }}>
                {userData.email}
              </Typography>
              <Button variant="outlined" fullWidth>
                Edit Profile
              </Button>
            </Paper>
          </Grid>

          {/* Info Cards */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card elevation={0}>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                        <Person />
                      </Avatar>
                      <Typography variant="h6">
                        Personal Information
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography color="textSecondary" gutterBottom>
                          First Name
                        </Typography>
                        <Typography variant="body1">
                          {userData.firstName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography color="textSecondary" gutterBottom>
                          Last Name
                        </Typography>
                        <Typography variant="body1">
                          {userData.lastName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card elevation={0}>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: 'secondary.light', mr: 2 }}>
                        <Email />
                      </Avatar>
                      <Typography variant="h6">
                        Contact Information
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography color="textSecondary" gutterBottom>
                      Email Address
                    </Typography>
                    <Typography variant="body1">
                      {userData.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;