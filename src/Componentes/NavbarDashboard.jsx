'use client'

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const NAV_ITEMS = [
  { label: 'Pedidos', href: '/dashboard/pedidosCompras' },
  { label: 'Productos', href: '/dashboard/ingresoProductos' },
  { label: 'Cupones', href: '/dashboard/cupones' },
  { label: 'Agenda', href: '/dashboard/calendario' },
  { label: 'Clientes Agendados', href: '/dashboard/agendaCitas' },
  { label: 'Categorías', href: '/dashboard/categoriasProductos' },
  { label: 'Publicaciones', href: '/dashboard/publicaciones' },
];

export default function NavbarDashboard() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const pathname = usePathname();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  // Cerrar menú automáticamente cuando cambia la ruta
  React.useEffect(() => {
    setAnchorElNav(null);
  }, [pathname]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Michroma&display=swap');
      `}</style>
      <AppBar position="sticky" color="inherit" elevation={0} sx={{
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        color: '#0F172A',
        borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.95) 100%)',
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(59, 130, 246, 0.06)',
        backdropFilter: 'blur(12px) saturate(1.5)',
        transition: 'all 0.3s ease-in-out'
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          {/* Branding / Título */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              boxShadow: '0 0 12px rgba(59, 130, 246, 0.4)'
            }} />
            <Typography
              variant="h6"
              component={Link}
              href="/dashboard"
              style={{ textDecoration: 'none', color: 'inherit' }}
              sx={{
                fontFamily: 'Michroma, sans-serif',
                fontWeight: 700,
                letterSpacing: '.08rem',
                color: '#0F172A',
                  fontSize: { xs: '0.85rem', md: '1.1rem' },
                  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }
              }}
            >
                Silueta Chic
            </Typography>
          </Box>

          {/* Empuja el bloque de navegación a la derecha */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Navegación Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="inherit"
                disableRipple
                sx={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  borderRadius: '10px',
                  px: 3,
                  py: 1,
                  color: '#475569',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #3B82F6, #2563EB)',
                    transition: 'width 0.3s ease'
                  },
                  '&:hover': {
                    bgcolor: 'rgba(59, 130, 246, 0.08)',
                    color: '#3B82F6',
                    '&::before': {
                      width: '80%'
                    }
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Navegación Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Button
              aria-controls={Boolean(anchorElNav) ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorElNav) ? 'true' : undefined}
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 500,
                fontSize: '0.9rem',
                color: '#475569',
                px: 2,
                borderRadius: '10px',
                '&:hover': {
                  bgcolor: 'rgba(59, 130, 246, 0.08)',
                  color: '#3B82F6'
                }
              }}
            >
              Menú
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: '12px',
                  mt: 1,
                  boxShadow: '0 4px 24px rgba(15, 23, 42, 0.1), 0 8px 48px rgba(59, 130, 246, 0.08)',
                  border: '1px solid rgba(148, 163, 184, 0.15)',
                  backdropFilter: 'blur(12px)',
                  bgcolor: 'rgba(255, 255, 255, 0.98)'
                }
              }}
            >
              {NAV_ITEMS.map((item) => (
                <MenuItem
                  key={item.href}
                  component={Link}
                  href={item.href}
                  onClick={handleCloseNavMenu}
                  sx={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.9rem',
                    py: 1.5,
                    px: 3,
                    color: '#475569',
                    textDecoration: 'none',
                    '&:hover': {
                      bgcolor: 'rgba(59, 130, 246, 0.08)',
                      color: '#3B82F6'
                    }
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}
