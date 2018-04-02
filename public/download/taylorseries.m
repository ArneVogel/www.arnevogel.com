syms x
f(x) = sin(x);
t = linspace(-8,8);

% convert to webm: ffmpeg -i output.gif -c:v libvpx -crf 12 -b:v 500K -auto-alt-ref 0 output.webm

h = figure;
axis tight manual
filename = 'output.gif';

start = 2;
ending = 10;
step = 1;

for i = start:step:ending
    tay = taylor(f,x, 'Order', i);
    plot(t,f(t)); hold on;
    plot(t,tay(t));
    grid on;
    ylim([-4 4]);
    xlim([-4 4]);
    legend('tan(x)', 'taylor series');
    
    drawnow 
    frame = getframe(h); 
    im = frame2im(frame); 
    [imind,cm] = rgb2ind(im,256);
    if i == start 
      imwrite(imind,cm,filename,'gif', 'Loopcount',inf); 
    else 
      imwrite(imind,cm,filename,'gif','WriteMode','append'); 
    end 
    clf
end
close;